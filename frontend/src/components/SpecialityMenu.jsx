import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <section id='speciality' className='py-16 px-5 sm:px-10 lg:px-20 bg-white'>
      <div className='text-center mb-10'>
        <h2 className='text-3xl sm:text-4xl font-bold text-blue-800'>Browse Specialities</h2>
        <p className='text-gray-500 text-sm mt-3 max-w-xl mx-auto'>
          Select your health concern and get matched with specialists instantly.
        </p>
      </div>

      {/* Scrollable Container */}
      <div className='overflow-x-auto whitespace-nowrap scrollbar-hide px-2 py-2'>
        <div className='flex gap-6'>
          {specialityData.map((item, index) => (
            <Link
              to={`/doctors/${item.speciality}`}
              onClick={() => scrollTo(0, 0)}
              key={index}
              className='flex flex-col items-center bg-gradient-to-tr from-blue-50 to-white border border-blue-100 rounded-2xl min-w-[120px] sm:min-w-[140px] py-5 px-4 hover:shadow-md transition duration-300 cursor-pointer hover:scale-105'
            >
              <div className='w-16 h-16 sm:w-20 sm:h-20 mb-3 bg-white rounded-full flex items-center justify-center shadow-sm'>
                <img src={item.image} alt={item.speciality} className='w-10 h-10 sm:w-12 sm:h-12 object-contain' />
              </div>
              <p className='text-sm sm:text-base font-medium text-gray-700 text-center'>{item.speciality}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SpecialityMenu
