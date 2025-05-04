import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <section id='speciality' className='py-20 px-6 sm:px-10 lg:px-24 bg-gradient-to-br from-white to-blue-50'>
      <div className='text-center mb-14'>
        <h2 className='text-4xl font-extrabold text-blue-800 tracking-tight mb-3 animate-pulse-slow'>
          Browse Specialities
        </h2>
        <p className='text-gray-600 text-md sm:text-lg max-w-xl mx-auto animate-fadeLoop'>
          Select your health concern and get matched with specialists instantly.
        </p>
      </div>

      <div className='overflow-x-auto scrollbar-hide'>
        <div className='flex gap-6 px-3 sm:px-5 py-4'>
          {specialityData.map((item, index) => (
            <Link
              to={`/doctors/${item.speciality}`}
              onClick={() => scrollTo(0, 0)}
              key={index}
              className='group flex flex-col items-center bg-white rounded-3xl border border-blue-100 shadow-md min-w-[140px] sm:min-w-[160px] p-5 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-blue-100/10 animate-float'
            >
              <div className='w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-4 transition-all duration-300 group-hover:scale-110'>
                <img
                  src={item.image}
                  alt={item.speciality}
                  className='w-12 h-12 sm:w-14 sm:h-14 object-contain'
                />
              </div>
              <p className='text-gray-700 text-sm sm:text-base font-semibold text-center group-hover:text-blue-700'>
                {item.speciality}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SpecialityMenu
