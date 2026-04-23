import React from 'react'
import { Route ,Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import Start from './pages/Start'
import UserProtectedWraper from './pages/UserProtectedWraper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'

const App = () => {
  return (
    <div>
      <Routes>

        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path="/home" 
        element={
          <UserProtectedWraper>
            <Home />
          </UserProtectedWraper>
        } />

        <Route path='/user/logout' 
        element={
          <UserProtectedWraper>
          <UserLogout />
        </UserProtectedWraper>} />
        
        <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App