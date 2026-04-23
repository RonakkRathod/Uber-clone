import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainProtectedWrapper = ({ children }) => {

    const navigate = useNavigate()
    
    const { setCaptain } = useContext(CaptainContext)
    const [isLoading, setIsLoading] = useState(true)
    
    const token = localStorage.getItem("token")
    useEffect(() => {
      const fetchCaptainProfile = async () => {
        if (!token) {
          navigate('/captain-login', { replace: true })
          setIsLoading(false)
          return
        }

        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/captain/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )

          if (response.status === 200) {
            setCaptain(response.data?.data)
          }
        } catch {
          localStorage.removeItem("token")
          navigate('/captain-login', { replace: true })
        } finally {
          setIsLoading(false)
        }
      }

      fetchCaptainProfile()
    }, [navigate, setCaptain, token])


    if (isLoading) {
      return (
        <div className='h-screen w-full flex items-center justify-center'>
          <h1 className='text-2xl font-medium'>Loading...</h1>
        </div>
      )
    }

  return (
    <>
        {children}
    </>
  )
}

export default CaptainProtectedWrapper