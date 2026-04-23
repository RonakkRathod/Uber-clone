import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className='bg-cover bg-[url(./image.png)] h-screen pt-8 w-full flex justify-between flex-col bg-blue-500'>

            <img className='w-18 ml-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

            <div className='bg-white py-4 px-4 pb-7'>
                <h2 className='text-3xl font-bold'>Getting Started with uber</h2>
                <Link to="/login" className='w-full bg-black text-white py-3 rounded-xl mt-5 flex items-center justify-center'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start