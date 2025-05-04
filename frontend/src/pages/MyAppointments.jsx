import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext)
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])
  const [payment, setPayment] = useState('')

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const formatDate = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    return `${day} ${months[Number(month) - 1]} ${year}`
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      setAppointments(data.appointments.reverse())
    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (id) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId: id }, { headers: { token } })
      data.success ? toast.success(data.message) : toast.error(data.message)
      getUserAppointments()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
          if (data.success) {
            navigate('/my-appointments')
            getUserAppointments()
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (id) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId: id }, { headers: { token } })
      data.success ? initPay(data.order) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const appointmentStripe = async (id) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId: id }, { headers: { token } })
      if (data.success) window.location.replace(data.session_url)
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) getUserAppointments()
  }, [token])

  return (
    <div className="min-h-screen px-4 md:px-10 py-10 bg-gradient-to-br from-[#f0f9ff] via-white to-[#fdf6fd]">
      <h2 className="text-3xl font-bold text-indigo-600 mb-8 border-b-2 pb-2">📅 My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments yet!</p>
      ) : (
        <div className="grid gap-6">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row gap-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.docData.image}
                alt={item.docData.name}
                className="w-36 h-36 object-cover rounded-xl bg-indigo-50"
              />

              <div className="flex-1 space-y-2 text-sm text-gray-700">
                <h3 className="text-xl font-bold text-gray-900">{item.docData.name}</h3>
                <p className="text-indigo-600 font-medium">{item.docData.speciality}</p>
                <div>
                  <p className="text-gray-600 font-semibold">📍 Address</p>
                  <p>{item.docData.address.line1}</p>
                  <p>{item.docData.address.line2}</p>
                </div>
                <p className="mt-2 text-gray-600 font-semibold">
                  🕒 Date & Time: <span className="font-normal">{formatDate(item.slotDate)} | {item.slotTime}</span>
                </p>
              </div>

              <div className="flex flex-col gap-2 justify-center items-center min-w-[200px] text-sm">
                {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                  <button
                    onClick={() => setPayment(item._id)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full w-full"
                  >
                    Pay Online
                  </button>
                )}

                {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                  <>
                    <button
                      onClick={() => appointmentStripe(item._id)}
                      className="px-4 py-2 border rounded-full w-full hover:bg-gray-100"
                    >
                      <img src={assets.stripe_logo} alt="Stripe" className="h-5 mx-auto" />
                    </button>
                    {/* <button
                      onClick={() => appointmentRazorpay(item._id)}
                      className="px-4 py-2 border rounded-full w-full hover:bg-gray-100"
                    >
                      <img src={assets.razorpay_logo} alt="Razorpay" className="h-5 mx-auto" />
                    </button> */}
                  </> 
                )}

                {!item.cancelled && item.payment && !item.isCompleted && (
                  <span className="bg-green-100 text-green-700 font-medium px-4 py-2 rounded-full w-full text-center">
                    ✅ Paid
                  </span>
                )}

                {item.isCompleted && (
                  <span className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-full w-full text-center">
                    🎉 Completed
                  </span>
                )}

                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="bg-red-100 hover:bg-red-600 hover:text-white text-red-600 px-4 py-2 rounded-full w-full transition"
                  >
                    ❌ Cancel
                  </button>
                )}

                {item.cancelled && (
                  <span className="bg-red-50 text-red-500 px-4 py-2 rounded-full w-full text-center">
                    ❗ Cancelled
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAppointments
