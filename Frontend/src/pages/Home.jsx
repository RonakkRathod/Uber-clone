 import React, { useRef, useState } from "react";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {

  const [pickUp, setpickUp] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setpanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  
  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(() => {

    if(panelOpen) {
      gsap.to(panelRef.current, {
      height: '70%',
      padding: 24
    })
    gsap.to(panelCloseRef.current,{
      opacity:1
    })

    }else{

      gsap.to(panelRef.current, {
        height: '0',
        padding: 0
      })     
      gsap.to(panelCloseRef.current,{
        opacity:0
      })

    }
  },[panelOpen])

  return (
    <div className="h-screen relative">
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
          <h5 ref={panelCloseRef}  onClick={() => {
            setpanelOpen(false)
          }} className="absolute opacity-0 top-6 right-6 text-2xl"><i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className="text-2xl pb-4 font-semibold">Find a trip</h4>
        <form onSubmit={(e) => {
          submitHandler(e);
        }}>
          <div className="line absolute h-22 w-1 top-[40%] left-8  bg-gray-900 rounded-full"></div>
          <input
          onClick={()=>{
            setpanelOpen(true)
          }}
            value={pickUp}
            onChange={(e) => {
              setpickUp(e.target.value)
            }}
            className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mb-4"
            type="text"
            placeholder="add a pickup location"
          />
          <input
          onClick={()=>{
            setpanelOpen(true)
          }}
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value)
          }}
            className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mb-4"
            type="text"
            placeholder="Enter you destination"
          />
        </form>
        </div>
        <div ref={panelRef} className=" bg-white h-0">
          <LocationSearchPanel />
        </div>
      </div>
    </div>
  );
};

export default Home;
