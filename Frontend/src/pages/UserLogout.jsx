import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {
        const logoutUser = async () => {
            try {
                await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/users/logout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
            } finally {
                localStorage.removeItem("token")
                navigate("/login")
            }
        }
        logoutUser()
    }, [navigate, token])

  return (
    <div>UserLogout</div>
  )
}

export default UserLogout