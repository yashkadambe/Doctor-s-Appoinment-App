import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)
    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='bg-[#f5f8fa] py-20 px-6'>
            <div className='text-center mb-12'>
                <h1 className='text-3xl sm:text-4xl font-bold text-[#1e293b]'>You Might Also Like</h1>
                <p className='mt-3 text-gray-500 text-sm sm:w-1/2 mx-auto'>
                    Discover other top-rated doctors who specialize in <strong className="text-black">{speciality}</strong>.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {relDoc.map((doc, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            navigate(`/appointment/${doc._id}`);
                            window.scrollTo(0, 0)
                        }}
                        className='bg-white border border-gray-200 hover:border-primary rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 group'
                    >
                        <img src={doc.image} alt={doc.name} className='w-full h-48 object-cover' />
                        <div className='p-5'>
                            <div className='flex justify-between items-center mb-2'>
                                <h2 className='text-lg font-semibold text-[#1e293b]'>{doc.name}</h2>
                                <span className='text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full'>Available</span>
                            </div>
                            <p className='text-sm text-gray-500 mb-3'>{doc.speciality}</p>
                            <p className='text-xs text-gray-400 group-hover:text-gray-600 transition-colors duration-200'>Click to book an appointment</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedDoctors
