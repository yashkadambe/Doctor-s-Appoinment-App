import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    let filtered = doctors
    if (speciality) {
      filtered = filtered.filter(doc => doc.speciality === speciality)
    }
    if (search) {
      filtered = filtered.filter(doc => doc.name.toLowerCase().includes(search.toLowerCase()))
    }
    setFilterDoc(filtered)
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality, search])

  const categories = ['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist']

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">Meet Our Specialists</h2>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                onClick={() => speciality === cat ? navigate('/doctors') : navigate(`/doctors/${cat}`)}
                className={`px-4 py-1.5 rounded-full text-sm cursor-pointer border transition-all duration-300 hover:bg-blue-600 hover:text-white ${
                  speciality === cat ? 'bg-blue-600 text-white' : 'text-gray-600 border-gray-300'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterDoc.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">No doctors found.</p>
          ) : (
            filterDoc.map((doc, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/appointment/${doc._id}`)
                  window.scrollTo(0, 0)
                }}
                className="group relative bg-white bg-opacity-80 backdrop-blur-md border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer"
              >
                <img src={doc.image} alt={doc.name} className="w-full h-56 object-cover transition-all duration-300 group-hover:scale-105" />
                
                <div className="p-5 space-y-2">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className={`flex items-center gap-1 ${doc.available ? 'text-green-600' : 'text-red-400'}`}>
                      <span className={`w-2 h-2 rounded-full ${doc.available ? 'bg-green-500' : 'bg-red-400'}`}></span>
                      {doc.available ? 'Available' : 'Not Available'}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{doc.speciality}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{doc.name}</h3>
                  <p className="text-sm text-gray-600">{doc.about?.slice(0, 60)}...</p>

                  <div className="flex justify-between items-center pt-3">
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{doc.experience || '5+ yrs exp'}</span>
                    <span className="text-yellow-500 text-xs">⭐ {doc.rating || '4.7'}</span>
                  </div>
                </div>

                {/* Hover Book Now Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-800 to-blue-500 opacity-0 group-hover:opacity-90 transition-all duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold">Book Appointment</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors
