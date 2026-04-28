/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import axios from "axios";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickUp, setpickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [confirmRidePanel, setconfirmRidePanel] = useState(false)
  const [vehicleFound, setvehicleFound] = useState(false)
  const [waitingForDriver, setwaitingForDriver] = useState(false)
  const [activeField, setActiveField] = useState("pickup");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState("");
  const [fare, setFare] = useState(null);
  const [fareLoading, setFareLoading] = useState(false);
  const [fareError, setFareError] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedFare, setSelectedFare] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmError, setConfirmError] = useState("");
  const [rideSummary, setRideSummary] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

useGSAP(() => {
  if (panelOpen) {
    gsap.to(panelRef.current, {
      height: "70%",
      padding: 24,
    });
    gsap.to(panelCloseRef.current, {
      opacity: 1,
    });
  } else {
    gsap.to(panelRef.current, {
      height: "0",
      padding: 0,
    });
    gsap.to(panelCloseRef.current, {
      opacity: 0,
    });
  }
}, [panelOpen]);

useGSAP(() => {
  if (vehiclePanel) {
    gsap.to(vehiclePanelRef.current, {
      transform: "translateY(0)",
    });
  } else {
    gsap.to(vehiclePanelRef.current, {
      transform: "translateY(100%)",
    });
  }
}, [vehiclePanel]);

useGSAP(() => {
  if (confirmRidePanel) {
    gsap.to(confirmRidePanelRef.current, {
      transform: "translateY(0)",
    });
  } else {
    gsap.to(confirmRidePanelRef.current, {
      transform: "translateY(100%)",
    });
  }
}, [confirmRidePanel]);

useGSAP(() => {
  if (waitingForDriver) {
    gsap.to(WaitingForDriverRef.current, {
      transform: "translateY(0)",
    });
  } else {
    gsap.to(WaitingForDriverRef.current, {
      transform: "translateY(100%)",
    });
  }
}, [waitingForDriver]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  const findTrip = async () => {
    const pickupValue = pickUp.trim();
    const destinationValue = destination.trim();

    if (!(pickupValue && destinationValue)) {
      setFare(null);
      setFareError("Pickup and destination are required");
      setvehiclePanel(true);
      setpanelOpen(false);
      return;
    }

    setvehiclePanel(true);
    setpanelOpen(false);
    setFareLoading(true);
    setFareError("");
    setSelectedVehicleType("");
    setSelectedFare(null);
    setRideSummary(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/ride/fare`,
        {
          params: {
            pickupLocation: pickupValue,
            destination: destinationValue,
          },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      setFare(response.data?.data || null);
    } catch (error) {
      setFare(null);
      setFareError("Failed to load fare");
    } finally {
      setFareLoading(false);
    }
  };

  const handleSelectVehicle = (type, fareValue) => {
    setSelectedVehicleType(type);
    setSelectedFare(fareValue ?? null);
    setconfirmRidePanel(true);
  };

  const createRide = async () => {
    const pickupValue = pickUp.trim();
    const destinationValue = destination.trim();

    if (!(pickupValue && destinationValue && selectedVehicleType)) {
      setConfirmError("Pickup, destination, and vehicle are required");
      return;
    }

    setConfirmLoading(true);
    setConfirmError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/create`,
        {
          pickupLocation: pickupValue,
          destination: destinationValue,
          vehicleType: selectedVehicleType,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      const createdRide = response.data?.data;
      setRideSummary({
        pickupLocation: createdRide?.pickupLocation || pickupValue,
        destination: createdRide?.destination || destinationValue,
        fare: createdRide?.fare ?? selectedFare,
        vehicleType: selectedVehicleType,
      });

      setconfirmRidePanel(false);
      setvehicleFound(true);
    } catch (error) {
      setConfirmError("Failed to create ride");
    } finally {
      setConfirmLoading(false);
    }
  };


  useEffect(() => {
    if (!panelOpen) {
      setSuggestionsLoading(false);
      return;
    }

    const query = activeField === "pickup" ? pickUp : destination;
    if (!query || query.trim().length < 3) {
      setSuggestions([]);
      setSuggestionsLoading(false);
      setSuggestionsError("");
      return;
    }

    setSuggestionsLoading(true);
    setSuggestionsError("");
    setSuggestions([]);

    const timeoutId = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/map/suggestions`,
          {
            params: { input: query.trim() },
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        setSuggestions(response.data?.data || []);
      } catch (error) {
        setSuggestions([]);
        setSuggestionsError("Failed to load suggestions");
      } finally {
        setSuggestionsLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [panelOpen, activeField, pickUp, destination]);

  return (
    <div className="h-screen overflow-hidden relative">
      <img
        className="w-18 top-5 left-5 absolute"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />

      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="./Home.png"
          alt="Uber Home"
        />
      </div>
      <div className=" flex flex-col justify-end absolute h-screen top-0 w-full">
        <div className="h-[30%] p-6  bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setpanelOpen(false);
            }}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl pb-4 font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-22 w-1 top-[40%] left-8  bg-gray-900 rounded-full"></div>
            <input
              onClick={() => {
                setpanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickUp}
              onChange={(e) => {
                setpickUp(e.target.value);
                setActiveField("pickup");
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mb-4"
              type="text"
              placeholder="add a pickup location"
            />
            <input
              onClick={() => {
                setpanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setActiveField("destination");
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mb-4"
              type="text"
              placeholder="Enter you destination"
            />
          </form>
          <div className="flex items-center justify-center rounded-lg p-2 font-bold w-full bg-black text-[#eee]">
            <button onClick={findTrip} >
            Find a ride
          </button>
          </div>
        </div>
        <div ref={panelRef} className=" bg-white h-0">
          <LocationSearchPanel
            setpanelOpen={setpanelOpen}
            setvehiclePanel={setvehiclePanel}
            suggestions={suggestions}
            suggestionsLoading={suggestionsLoading}
            suggestionsError={suggestionsError}
            onSelect={(suggestion) => {
              const value = suggestion?.displayName || "";
              if (activeField === "pickup") {
                setpickUp(value);
              } else {
                setDestination(value);
              }
              // setpanelOpen(false);
            }}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed bottom-0 w-full z-10 translate-y-full px-3 py-10 bg-white"
      >
        <VehiclePanel
          setconfirmRidePanel={setconfirmRidePanel}
          setvehiclePanel={setvehiclePanel}
          fare={fare}
          fareLoading={fareLoading}
          fareError={fareError}
          onSelectVehicle={handleSelectVehicle}
          selectedVehicleType={selectedVehicleType}
        />
      </div> 
      <div
        ref={confirmRidePanelRef}
        className="fixed bottom-0 w-full z-10 translate-y-full px-3 py-12 bg-white"
      >
        <ConfirmedRide
          setvehiclePanel={setvehiclePanel}
          setconfirmRidePanel={setconfirmRidePanel}
          setvehicleFound={setvehicleFound}
          pickupLocation={pickUp}
          destination={destination}
          fare={selectedFare}
          vehicleType={selectedVehicleType}
          confirmLoading={confirmLoading}
          confirmError={confirmError}
          onConfirm={createRide}
        />
      </div> 
      <div
        ref={vehicleFoundRef}
        className="fixed bottom-0 w-full z-10 translate-y-full px-3 py-12 bg-white"
      >
        <LookingForDriver
          setvehicleFound={setvehicleFound}
          pickupLocation={rideSummary?.pickupLocation}
          destination={rideSummary?.destination}
          fare={rideSummary?.fare}
          vehicleType={rideSummary?.vehicleType}
        />
      </div> 
      <div
        ref={WaitingForDriverRef}
        className="fixed bottom-0 w-full z-10 translate-y-full px-3 py-12 bg-white"
      >
        <WaitingForDriver waitingForDriver={waitingForDriver} />
      </div> 
    </div>
  );
};

export default Home;
