 import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext.jsx'
import axios from 'axios'

const UserProtectedWrapper = ({ children }) => {

    const navigate = useNavigate()
    
  const userContext = useContext(UserDataContext)
  const setUser = userContext?.setUser
    const [isLoading, setIsLoading] = useState(true)
    
    const token = localStorage.getItem("token")
    useEffect(() => {
      const fetchUserProfile = async () => {
        if (!token || !setUser) {
          navigate('/login', { replace: true })
          setIsLoading(false)
          return
        }

        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/users/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )

          if (response.status === 200) {
            setUser(response.data?.data)
          }
        } catch {
          localStorage.removeItem("token")
          navigate('/login', { replace: true })
        } finally {
          setIsLoading(false)
        }
      }

      fetchUserProfile()
    }, [navigate, setUser, token])


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

export default UserProtectedWrapper