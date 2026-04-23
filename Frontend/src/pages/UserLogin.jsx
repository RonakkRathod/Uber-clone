import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [userData, setUserData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()
       setUserData({
        email,
        password
       })
        setEmail('')
        setPassword('')
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
       <div>
         <img className='w-18 mb-10 ' src="https://icon2.cleanpng.com/lnd/20241123/fe/01a0c7a4bc31fd14d50f86a45d55c0.webp" alt="" />

        <form onSubmit={(e) => {
            submitHandler(e)
        }}>

            <h3 className='text-lg font-medium mb-2'>What's your email</h3>

            <input
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            required 
            placeholder='ronak@gmail.com'
            value={email}
            onChange={(e) => {
                setEmail(e.target.value)
            }}
            />

            <h3 className='text-lg mb-2 font-medium '>Enter password</h3>

            <input 
             className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password" 
            required 
            placeholder='Enter your password'
            value={password}
            onChange={(e) => {
                setPassword(e.target.value)
            }}
            />

            <button className='bg-[#111] mb-3 px-4 py-2 rounded w-full text-white placeholder:text-base'>Login</button>

            <p className='text-center'>New here? <Link to={'/signup'} className='text-blue-600'>Create new Account</Link></p>
        </form>
       </div>
       <div>
        <Link 
        to={'/captain-login'}
        className='bg-[#10b461] flex items-center justify-center mb-5 px-4 py-2 rounded w-full text-white font-semibold placeholder:text-base'>Sign in as Captain</Link>
       </div>
    </div>
  )
}

export default UserLogin