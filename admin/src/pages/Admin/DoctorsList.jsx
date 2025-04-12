import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll bg-gradient-to-r from-blue-50 to-gray-100 p-8 rounded-xl shadow-2xl'>
      <h1 className='text-3xl font-extrabold text-gray-900 mb-6 text-center'>Doctors List</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
        {doctors.map((item, index) => (
          <div 
            className='bg-white backdrop-blur-lg bg-opacity-80 rounded-2xl shadow-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl'
            key={index}
          >
            <img className='w-full h-48 object-cover rounded-t-2xl' src={item.image} alt='Doctor' />
            <div className='p-6 text-center'>
              <p className='text-xl font-bold text-gray-800'>{item.name}</p>
              <p className='text-md text-gray-600 mb-3'>{item.speciality}</p>
              <div className='flex items-center justify-center gap-3'>
                <label className='flex items-center cursor-pointer'>
                  <input 
                    type='checkbox' 
                    checked={item.available} 
                    onChange={() => changeAvailability(item._id)}
                    className='hidden'
                  />
                  <div className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 transition-all ${item.available ? 'bg-green-500' : 'bg-red-500'}`}>
                    <div className={`bg-white w-6 h-6 rounded-full shadow-md transform ${item.available ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </label>
                <p className={`font-semibold ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
