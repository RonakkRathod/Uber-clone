import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";

const Home = () => {
  const [pickUp, setpickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [confirmRidePanel, setconfirmRidePanel] = useState(false)

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
              }}
              value={pickUp}
              onChange={(e) => {
                setpickUp(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mb-4"
              type="text"
              placeholder="add a pickup location"
            />
            <input
              onClick={() => {
                setpanelOpen(true);
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mb-4"
              type="text"
              placeholder="Enter you destination"
            />
          </form>
        </div>
        <div ref={panelRef} className=" bg-white h-0">
          <LocationSearchPanel
            setpanelOpen={setpanelOpen}
            setvehiclePanel={setvehiclePanel}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed bottom-0 w-full z-10 translate-y-full px-3 py-10 bg-white"
      >
        <VehiclePanel setconfirmRidePanel={setconfirmRidePanel} setvehiclePanel={setvehiclePanel} />
       </div> 
      <div
        ref={confirmRidePanelRef}
        className="fixed bottom-0 w-full z-10 translate-y-full px-3 py-12 bg-white"
      >
        <ConfirmedRide  setconfirmRidePanel={setconfirmRidePanel}/>
       </div> 
      <div
        className="fixed bottom-0 w-full z-10 translate-y-full px-3 py-12 bg-white"
      >
        
       </div> 
    </div>
  );
};

export default Home;
