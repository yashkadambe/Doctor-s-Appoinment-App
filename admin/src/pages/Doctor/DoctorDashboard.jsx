import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className='m-5'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
        {[{
          icon: assets.earning_icon,
          value: `${currency} ${dashData.earnings}`,
          label: 'Earnings',
          bg: 'bg-gradient-to-r from-green-400 to-blue-500'
        }, {
          icon: assets.appointments_icon,
          value: dashData.appointments,
          label: 'Appointments',
          bg: 'bg-gradient-to-r from-purple-400 to-pink-500'
        }, {
          icon: assets.patients_icon,
          value: dashData.patients,
          label: 'Patients',
          bg: 'bg-gradient-to-r from-yellow-400 to-orange-500'
        }].map((item, index) => (
          <div key={index} className={`flex items-center gap-4 p-6 rounded-lg shadow-md text-white ${item.bg} hover:scale-105 transition-transform`}>
            <img className='w-16' src={item.icon} alt={item.label} />
            <div>
              <p className='text-2xl font-bold'>{item.value}</p>
              <p className='text-lg'>{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='bg-white shadow-md rounded-lg mt-10'>
        <div className='flex items-center gap-3 px-6 py-4 bg-gray-100 rounded-t-lg'>
          <img src={assets.list_icon} alt='list' />
          <p className='font-semibold text-gray-700 text-lg'>Latest Bookings</p>
        </div>

        <div className='divide-y'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div key={index} className='flex items-center px-6 py-4 hover:bg-gray-50 transition'>
              <img className='rounded-full w-12 h-12' src={item.userData.image} alt='Patient' />
              <div className='flex-1 text-sm pl-4'>
                <p className='text-gray-900 font-medium'>{item.userData.name}</p>
                <p className='text-gray-600'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className='text-red-500 text-xs font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs font-medium'>Completed</p>
              ) : (
                <div className='flex gap-3'>
                  <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer hover:opacity-80' src={assets.cancel_icon} alt='Cancel' />
                  <img onClick={() => completeAppointment(item._id)} className='w-8 cursor-pointer hover:opacity-80' src={assets.tick_icon} alt='Complete' />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;