import React, { useEffect } from 'react';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md'>
      <p className='text-xl font-semibold text-gray-700 mb-4'>All Appointments</p>

      <div className='bg-white border rounded-lg shadow-sm text-sm max-h-[70vh] overflow-y-auto'>
        <div className='grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b bg-blue-100 text-gray-700 font-semibold'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div
            className='grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-4 px-6 border-b hover:bg-gray-50 transition-all duration-200'
            key={index}
          >
            <p>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className='w-10 h-10 rounded-full border' alt='' />
              <p>{item.userData.name}</p>
            </div>
            <p>{calculateAge(item.userData.dob)}</p>
            <p className='text-gray-700 font-medium'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img src={item.docData.image} className='w-10 h-10 rounded-full border' alt='' />
              <p>{item.docData.name}</p>
            </div>
            <p className='text-blue-500 font-semibold'>{currency}{item.amount}</p>
            {item.cancelled ? (
              <p className='text-red-500 font-medium'>Cancelled</p>
            ) : item.isCompleted ? (
              <p className='text-green-500 font-medium'>Completed</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className='w-8 cursor-pointer hover:opacity-75 transition-all'
                src={assets.cancel_icon}
                alt='Cancel'
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
