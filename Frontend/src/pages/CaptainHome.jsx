import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'

const CaptainHome = () => {

  const ridePopUpPanelRef = useRef(null)
  const confirmRidePpUpPanelRef = useRef(null)

  const [ridePopUpPanel, setRidePopUpPanel] = useState(true)
  const [confirmRidePopUp, setconfirmRidePopUp] = useState(false)

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (confirmRidePopUp) {
      gsap.to(confirmRidePpUpPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePpUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopUp]);

  return (
    <div className='h-screen'>
      <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
         <Link to='/captain-login' className='h-10 w-20 bg-white flex items-center justify-center rounded-full'>
          <i className="font-medium text-lg ri-logout-box-r-line"></i>
        </Link>
      </div> 
        <div className='h-3/5'>
            <img  className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className='h-2/5 p-6'>
          <CaptainDetails />
        </div>
         <div ref={ridePopUpPanelRef} className="fixed bottom-0 w-full z-10 px-3 translate-y-full py-10 bg-white">
          <RidePopUp setconfirmRidePopUp={setconfirmRidePopUp} setRidePopUpPanel={setRidePopUpPanel} />
        </div> 

         <div ref={confirmRidePpUpPanelRef} className="fixed bottom-0 w-full z-10 px-3 translate-y-full py-10 h-screen bg-white">
          <ConfirmRidePopUp setconfirmRidePopUp={setconfirmRidePopUp}  setRidePopUpPanel={setRidePopUpPanel}/>
        </div> 
    </div>
  )
}

export default CaptainHome