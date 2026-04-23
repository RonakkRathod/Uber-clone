/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CaptainContext } from "../context/CaptainContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [captainData, setCaptainData] = useState({});

  const { captain, setCaptain } = useContext(CaptainContext)
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainPayload = {
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/register`,
      captainPayload,
    );

    if (response.status === 201) {
      const data = response.data?.data;

      setCaptain(data?.createdCaptain);
      localStorage.setItem("token", data?.captainToken);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };
  return (
    <div className="p-7 py-5 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-18 mb-10 "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
          alt=""
        />

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-3 mb-5">
            <input
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-sm placeholder:text-base"
              type="text"
              required
              placeholder="First name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-sm placeholder:text-base"
              type="text"
              required
              placeholder="Last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email</h3>

          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-sm placeholder:text-base"
            type="email"
            required
            placeholder="ronak@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <h3 className="text-lg base mb-2 font-medium ">Enter password</h3>

          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-sm placeholder:text-base"
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <h3 className="text-lg font-medium mb-2">Vehicle color</h3>

          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-sm placeholder:text-base"
            type="text"
            required
            placeholder="Black"
            value={vehicleColor}
            onChange={(e) => {
              setVehicleColor(e.target.value);
            }}
          />

          <h3 className="text-lg font-medium mb-2">Vehicle plate number</h3>

          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-sm placeholder:text-base"
            type="text"
            required
            placeholder="GJ01AB1234"
            value={vehiclePlate}
            onChange={(e) => {
              setVehiclePlate(e.target.value);
            }}
          />

          <h3 className="text-lg font-medium mb-2">Passenger capacity</h3>

          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-sm placeholder:text-base"
            type="number"
            min="1"
            required
            placeholder="4"
            value={vehicleCapacity}
            onChange={(e) => {
              setVehicleCapacity(e.target.value);
            }}
          />

          <h3 className="text-lg font-medium mb-2">Vehicle type</h3>

          <select
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-sm"
            required
            value={vehicleType}
            onChange={(e) => {
              setVehicleType(e.target.value);
            }}
          >
            <option value="">Select vehicle type</option>
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="autoRickshaw">Auto Rickshaw</option>
          </select>

          <button className="bg-[#111] mb-5 px-4 py-2 rounded w-full text-white placeholder:text-sm">
            Register
          </button>

          <p className="text-center">
            Already have a account ?{" "}
            <Link to={"/captain-login"} className="text-blue-600">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          By proceeding our terms, your consent to get calls, Whatsapp or SMS
          messages, including by automated message from Us to the number you provided.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignUp;
