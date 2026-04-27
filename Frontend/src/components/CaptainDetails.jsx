import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
         <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start gap-4'>
              <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTH4dlV0UI27TlS52PbJ2N78hINGV4m43mKg&s" alt="" />
              <h4 className='text-lg font-medium'>Sherya Patel</h4>
            </div>
            <div>
              <h4 className='text-xl font-semibold'>₹286.20</h4>
              <p className='text-sm font-medium text-gray-600'>Earned</p>
            </div>
          </div>
          <div className='flex p-6 mt-6 bg-gray-200 rounded-xl justify-center gap-5 items-start'>
            <div className='text-center'>
              <i className="text-3xl mb-2 font-thin ri-timer-line"></i>
                <h5 className='text-lg font-medium'>25.2</h5>
                <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
            <div className='text-center'>
              <i className="text-3xl mb-2 font-thin ri-speed-up-fill"></i>
              <h5 className='text-lg font-medium'>4.8</h5>
              <p className='text-sm text-gray-600'>Rating</p>
            </div>
            <div className='text-center'>
              <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
              <h5 className='text-lg font-medium'>120</h5>
              <p className='text-sm text-gray-600'>Rides Completed</p>
            </div>
          </div>
    </div>
  )
}

export default CaptainDetails