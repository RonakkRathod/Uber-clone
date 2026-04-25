import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {
        const logoutCaptain = async () => {
           try {
         await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/logout`,
                 {},
                 {
                     headers: {
                         Authorization: `Bearer ${token}`
                     }
                 }
             )
         } catch (error) {
        console.error('Captain logout failed:', error)
           }finally{
            localStorage.removeItem("token")
            navigate('/captain-login')
           }
        }
        logoutCaptain()   
    }, [token, navigate])
    

  return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout