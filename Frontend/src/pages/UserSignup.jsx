import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setuserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setuserData({
      username:{
        firstName,
        lastName
      },
      email,
      password,
    })
    console.log(userData)
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-18 mb-10 "
          src="https://icon2.cleanpng.com/lnd/20241123/fe/01a0c7a4bc31fd14d50f86a45d55c0.webp"
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
            onChange={(e) => {setFirstName(e.target.value)}}
          />
           <input
            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-sm placeholder:text-base"
            type="text"
            required
            placeholder="Last name"
            value={lastName}
            onChange={(e) => {setLastName(e.target.value)}}
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

          <button className="bg-[#111] mb-5 px-4 py-2 rounded w-full text-white placeholder:text-sm">
            Register
          </button>

          <p className="text-center">
            Already have a account ?{" "}
            <Link to={"/login"} className="text-blue-600">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[10px] leading-tight">By proceeding our terms, your consent to get calls, Whatsapp or SMS messages, including by automated message from Uber and its affilates to the number you provided.</p>
      </div>
    </div>
  );
};

export default UserSignup;
