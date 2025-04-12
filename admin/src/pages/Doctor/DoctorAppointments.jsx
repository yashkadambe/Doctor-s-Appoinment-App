import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className='w-full max-w-6xl mx-auto my-6 p-6 bg-gray-100 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold text-gray-800 mb-5'>Doctor Appointments</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {appointments.map((item, index) => (
          <div
            key={index}
            className='bg-white p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all flex flex-col gap-3'
          >
            <div className='flex items-center gap-3'>
              <img src={item.userData.image} className='w-12 h-12 rounded-full' alt='Patient' />
              <div>
                <p className='text-lg font-semibold text-gray-700'>{item.userData.name}</p>
                <p className='text-sm text-gray-500'>Age: {calculateAge(item.userData.dob)}</p>
              </div>
            </div>
            <div className='flex justify-between items-center text-sm text-gray-600'>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.payment ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>{item.payment ? 'Online' : 'CASH'}</span>
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-gray-700 font-medium'>{currency}{item.amount}</p>
              {item.cancelled ? (
                <p className='text-red-500 text-xs font-bold'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs font-bold'>Completed</p>
              ) : (
                <div className='flex gap-2'>
                  <button onClick={() => cancelAppointment(item._id)} className='bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition'>Cancel</button>
                  <button onClick={() => completeAppointment(item._id)} className='bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition'>Complete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
