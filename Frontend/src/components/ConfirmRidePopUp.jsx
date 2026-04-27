import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState("")

    const submitHandler = (e) => {
        e.preventDefault()

        setOtp("")
    }

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
      >
        {" "}
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5 ">
        Confirm this ride to Start
      </h3>
      <div className="flex items-center justify-between bg-yellow-300 rounded-lg mt-4 p-3">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://www.shutterstock.com/image-photo/portrait-young-beautiful-girl-pleasant-260nw-2632206703.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">Divya Patel</h2>
        </div>
        <h2 className="text-lg font-semibold">2.5 km</h2>
      </div>
      <div className="flex gap-2 flex-col justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-6 p-4 border-b-2">
            <i className="ri-map-pin-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">21A-3B</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Soujanya Apartments,Ahmedabad
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-4 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">111-2A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kankriya Lake,Ahmedabad
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-4">
            <i className="ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹195.50</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kankriya Lake,Ahmedabad
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <input value={otp} onChange={(e)=>setOtp(e.target.value)} className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mb-2" type="text" placeholder="Enter OTP" />

            <Link
              to="/captain-riding"
              onClick={() => {
                props.setRidePopUpPanel(false);
              }}
              className=" flex justify-center w-full mt-5 bg-green-600 text-white font-semibold text-lg p-2 mb-2 rounded-lg"
            >
              Confirm
            </Link>
            <button
              onClick={() => {
                props.setconfirmRidePopUp(false);
                props.setRidePopUpPanel(false);
              }}
              className="w-full text-lg bg-red-500 text-white font-semibold p-2 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
