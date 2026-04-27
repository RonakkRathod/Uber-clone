import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
        <Link to='/home' className='fixed right-2 top-2 h-10 w-20 bg-white flex items-center justify-center rounded-full'>
           <i className="font-medium text-lg ri-home-5-line"></i>
        </Link>
        <div className='h-1/2'>
            <img  className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className='h-1/2 p-4'>
        <div className='flex items-center justify-between'>
           <img className='h-12' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n" alt="" />
           <div className='text-right'>
            <h2 className='text-lg font-medium'>Ronak</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>GJ 01 5248</h4>
            <p className='font-sm text-gray-600'>Maruti suzuki Alto</p>
           </div>
        </div>
        <div className='flex gap-2 flex-col justify-between items-center'>
            <div className='w-full mt-5'>
                <div className='flex items-center gap-6 p-4 border-b-2'>
                    <i className="ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562-11/A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Kankriya Talab,Ahmedabad</p>
                    </div>
                </div>
                <div className='flex items-center gap-6 p-4'>
                    <i className="ri-money-rupee-circle-line"></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹195.50</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Kankriya Talab,Ahmedabad</p>
                    </div>
                </div>
            </div>
        </div>
        <button className='w-full mt-5 bg-black text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
        </div>
    </div>
  )
}

export default Riding