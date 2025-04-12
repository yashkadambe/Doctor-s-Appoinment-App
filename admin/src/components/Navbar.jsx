import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='flex justify-between items-center px-6 sm:px-12 py-4 border-b shadow-md bg-white'>
      {/* Left side: Logo and Role Badge */}
      <div className='flex items-center gap-4'>
        <img 
          onClick={() => navigate('/')} 
          className='w-32 sm:w-36 cursor-pointer transition-transform duration-300 transform hover:scale-105' 
          src={assets.admin_logo} 
          alt="Logo" 
        />
        <p className='px-4 py-2 bg-gray-100 text-gray-700 text-sm sm:text-base rounded-full font-medium shadow-md'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>

      {/* Right side: Logout button */}
      <div className='flex items-center'>
        <button 
          onClick={() => logout()} 
          className='bg-blue-800 text-white text-sm px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-primary-dark transition-all duration-200 focus:outline-none'>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
