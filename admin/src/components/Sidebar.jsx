import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  const menuItems = [
    { to: '/admin-dashboard', icon: assets.home_icon, label: 'Dashboard' },
    { to: '/all-appointments', icon: assets.appointment_icon, label: 'Appointments' },
    { to: '/add-doctor', icon: assets.add_icon, label: 'Add Doctor' },
    { to: '/doctor-list', icon: assets.people_icon, label: 'Doctors List' },
  ];

  const doctorMenuItems = [
    { to: '/doctor-dashboard', icon: assets.home_icon, label: 'Dashboard' },
    { to: '/doctor-appointments', icon: assets.appointment_icon, label: 'Appointments' },
    { to: '/doctor-profile', icon: assets.people_icon, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen w-64 bg-gradient-to-b from-blue-900 to-indigo-800 text-white shadow-xl flex flex-col">
      <div className="py-6 px-8 border-b border-gray-700 flex items-center gap-3">
        {/* <img src={assets.logo} alt="Logo" className="h-12" /> */}
        <span className="text-lg font-bold">MediSphere</span>
      </div>
      <nav className="flex-1 overflow-y-auto mt-4">
        {aToken && (
          <ul className="space-y-3 px-4">
            {menuItems.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-4 py-3 px-5 rounded-lg transition-all duration-300 ${isActive ? 'bg-white text-indigo-700 shadow-md' : 'hover:bg-indigo-700 hover:bg-opacity-75'}`
                }
              >
                <img className="w-6" src={icon} alt="" />
                <p className="text-base font-medium">{label}</p>
              </NavLink>
            ))}
          </ul>
        )}
        {dToken && (
          <ul className="mt-6 space-y-3 px-4">
            {doctorMenuItems.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-4 py-3 px-5 rounded-lg transition-all duration-300 ${isActive ? 'bg-white text-indigo-700 shadow-md' : 'hover:bg-indigo-700 hover:bg-opacity-75'}`
                }
              >
                <img className="w-6" src={icon} alt="" />
                <p className="text-base font-medium">{label}</p>
              </NavLink>
            ))}
          </ul>
        )}
      </nav>
      <div className="p-6 border-t border-gray-700 text-center text-sm opacity-75">© 2025 MediSphere</div>
    </div>
  );
};

export default Sidebar;