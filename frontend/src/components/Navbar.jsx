import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <header className='bg-white shadow-lg sticky top-0 z-30'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <img onClick={() => navigate('/')} className='w-40 cursor-pointer' src={assets.logo} alt='Logo' />

          {/* Desktop Menu */}
          <nav className='hidden md:flex items-center gap-8 font-semibold text-gray-700'>
            <NavLink to='/' className={({ isActive }) => isActive ? 'text-primary' : ''}>HOME</NavLink>
            <NavLink to='/doctors' className={({ isActive }) => isActive ? 'text-primary' : ''}>ALL DOCTORS</NavLink>
            <NavLink to='/about' className={({ isActive }) => isActive ? 'text-primary' : ''}>ABOUT</NavLink>
            <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-primary' : ''}>CONTACT</NavLink>
          </nav>

          {/* User / Auth Buttons */}
          <div className='flex items-center gap-4'>
            {
              token && userData ? (
                <div className='relative group cursor-pointer'>
                  <div className='flex items-center gap-2'>
                    <img className='w-9 h-9 rounded-full object-cover border-2 border-primary' src={userData.image} alt='User' />
                    <img className='w-3' src={assets.dropdown_icon} alt='Dropdown' />
                  </div>
                  <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out z-20'>
                    <ul className='flex flex-col text-sm text-gray-700'>
                      <li onClick={() => navigate('/my-profile')} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>My Profile</li>
                      <li onClick={() => navigate('/my-appointments')} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>My Appointments</li>
                      <li onClick={logout} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Logout</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <button onClick={() => navigate('/login')} className='bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full transition duration-300 hidden md:block'>Create Account</button>
              )
            }

            {/* Mobile Menu Button */}
            <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt='Menu' />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-40 transform ${showMenu ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}> 
        <div className='flex items-center justify-between px-5 py-6 border-b'>
          <img src={assets.logo} className='w-36' alt='Logo' />
          <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 cursor-pointer' alt='Close' />
        </div>
        <nav className='flex flex-col items-center gap-6 mt-8 text-lg font-semibold text-gray-700'>
          <NavLink onClick={() => setShowMenu(false)} to='/'>HOME</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/doctors'>ALL DOCTORS</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/contact'>CONTACT</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar