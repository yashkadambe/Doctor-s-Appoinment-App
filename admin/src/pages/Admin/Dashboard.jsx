import React, { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return dashData && (
    <div className='m-5 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen p-6 rounded-lg shadow-lg'>
      <div className='flex flex-wrap gap-6 justify-center'>
        {[{ label: "Doctors", value: dashData.doctors, icon: assets.doctor_icon },
          { label: "Appointments", value: dashData.appointments, icon: assets.appointments_icon },
          { label: "Patients", value: dashData.patients, icon: assets.patients_icon }]
          .map((item, index) => (
            <div key={index} className='flex items-center gap-3 bg-white p-6 w-64 rounded-lg shadow-md border border-gray-300 cursor-pointer transform transition duration-300 hover:scale-105'>
              <img className='w-14' src={item.icon} alt={item.label} />
              <div>
                <p className='text-2xl font-bold text-gray-700'>{item.value}</p>
                <p className='text-gray-500'>{item.label}</p>
              </div>
            </div>
          ))}
      </div>

      <div className='bg-white mt-10 rounded-lg shadow-md border border-gray-300 overflow-hidden'>
        <div className='flex items-center gap-2.5 px-6 py-4 bg-gray-200 border-b'>
          <img src={assets.list_icon} alt="list" className='w-6' />
          <p className='font-semibold text-gray-700 text-lg'>Latest Bookings</p>
        </div>

        <div className='py-4'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div key={index} className='flex items-center px-6 py-3 gap-4 hover:bg-gray-100 transition'>
              <img className='rounded-full w-12 border-2 border-gray-300' src={item.docData.image} alt={item.docData.name} />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-semibold'>{item.docData.name}</p>
                <p className='text-gray-600'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? 
                <p className='text-red-500 text-xs font-medium'>Cancelled</p> : 
                item.isCompleted ? 
                <p className='text-green-500 text-xs font-medium'>Completed</p> : 
                <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer' src={assets.cancel_icon} alt="cancel" />
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
