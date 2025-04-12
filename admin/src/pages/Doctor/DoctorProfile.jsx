import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className='flex flex-col items-center bg-gray-50 py-10 px-5'>
            <div className='bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full p-6 flex flex-col sm:flex-row gap-6'>
                <div className='flex-shrink-0'>
                    <img className='bg-primary/80 w-40 sm:w-52 rounded-lg' src={profileData.image} alt="Doctor Profile" />
                </div>
                <div className='flex-1'>
                    <p className='text-3xl font-semibold text-gray-800'>{profileData.name}</p>
                    <p className='text-gray-600 mt-1'>{profileData.degree} - {profileData.speciality}</p>
                    <p className='text-sm text-gray-500'>{profileData.experience} years of experience</p>
                    
                    <div className='mt-4'>
                        <p className='text-lg font-medium text-gray-700'>About</p>
                        <p className='text-sm text-gray-600 mt-1'>
                            {isEdit ? <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} className='w-full border p-2 rounded-lg' rows={4} value={profileData.about} /> : profileData.about}
                        </p>
                    </div>
                    
                    <div className='mt-4'>
                        <p className='text-lg font-medium text-gray-700'>Appointment Fee</p>
                        <p className='text-gray-800'>{currency} {isEdit ? <input type='number' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} className='border p-1 rounded' value={profileData.fees} /> : profileData.fees}</p>
                    </div>
                    
                    <div className='mt-4'>
                        <p className='text-lg font-medium text-gray-700'>Address</p>
                        <p className='text-sm text-gray-600'>
                            {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} className='border p-1 rounded w-full' value={profileData.address.line1} /> : profileData.address.line1}
                            <br />
                            {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} className='border p-1 rounded w-full' value={profileData.address.line2} /> : profileData.address.line2}
                        </p>
                    </div>

                    <div className='flex items-center gap-2 mt-4'>
                        <input type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
                        <label className='text-gray-700'>Available for Appointments</label>
                    </div>

                    <div className='mt-6'>
                        {isEdit ? 
                            <button onClick={updateProfile} className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all'>Save</button> 
                            : <button onClick={() => setIsEdit(prev => !prev)} className='px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all'>Edit</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile
