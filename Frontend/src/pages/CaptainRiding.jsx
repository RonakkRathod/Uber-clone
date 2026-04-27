import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RidePopUp from '../components/RidePopUp';
import FinishRide from '../components/FinishRide';
import { useRef } from 'react';

const CaptainRiding = () => {

    const [finishRidePanel, setfinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)

    useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className='h-screen relative'>
       
      <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
         <Link to='/captain-login' className='h-10 w-20 bg-white flex items-center justify-center rounded-full'>
          <i className="font-medium text-lg ri-logout-box-r-line"></i>
        </Link>
      </div> 
        <div className='h-4/5'>
            <img  className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
         
        <div onClick={() => {setfinishRidePanel(true)}} className='h-1/5 p-6 flex relative items-center justify-between bg-yellow-400'>
        <h5
          className="p-1 text-center w-[93%] absolute top-0"
          onClick={() => {
          }}
        > <i className="ri-arrow-up-wide-line text-3xl text-black"></i>
        </h5>
            <h4 className='text-xl font-semibold'>4 KM Away</h4>
            <button className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete ride</button>
        </div>
        <div ref={finishRidePanelRef} className="fixed bottom-0 w-full z-10 px-3 translate-y-full py-10 h-screen bg-white">
          <FinishRide setfinishRidePanel={setfinishRidePanel} />
        </div>
    </div>
  )
}

export default CaptainRiding