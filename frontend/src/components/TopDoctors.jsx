import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <section className='py-20 px-6 sm:px-10 lg:px-24 bg-white'>
      <div className='text-center mb-14'>
        <h2 className='text-4xl font-extrabold text-blue-800 tracking-tight'>Top Rated Doctors</h2>
        <p className='text-gray-500 text-sm mt-3 max-w-xl mx-auto'>
          Receive exceptional care from professionals you can trust. Browse & book your consultation instantly.
        </p>
      </div>

      <div className='grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {doctors.slice(0, 8).map((doc, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${doc._id}`)
              scrollTo(0, 0)
            }}
            className='rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-blue-100 group'
          >
            {/* Doctor Image */}
            <div className='relative h-56 w-full'>
              <img
                src={doc.image}
                alt={doc.name}
                className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
              />
              <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full 
                ${doc.available ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                {doc.available ? 'Available' : 'Offline'}
              </span>
            </div>

            {/* Doctor Details */}
            <div className='p-5 bg-white'>
              <h3 className='text-lg font-bold text-gray-800 group-hover:text-blue-700'>{doc.name}</h3>
              <p className='text-sm text-gray-500 mt-1'>{doc.speciality}</p>

              <div className='flex justify-between items-center mt-6'>
                <button className='text-sm font-medium text-blue-600 hover:underline'>
                  Book Now
                </button>
                <div className='text-xs text-gray-400'>Tap to view</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Doctors Button */}
      <div className='text-center mt-16'>
        <button
          onClick={() => {
            navigate('/doctors')
            scrollTo(0, 0)
          }}
          className='bg-blue-700 hover:bg-blue-800 text-white text-sm px-8 py-3 rounded-full transition duration-300'
        >
          View All Doctors
        </button>
      </div>
    </section>
  )
}

export default TopDoctors
