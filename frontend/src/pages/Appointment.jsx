import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const navigate = useNavigate();

  const fetchDocInfo = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctor);
  };

  const getAvailableSlots = () => {
    setDocSlots([]);
    const today = new Date();
    let generatedSlots = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const startTime = new Date(currentDate);
      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        startTime.setHours(Math.max(10, startTime.getHours() + 1));
        startTime.setMinutes(startTime.getMinutes() > 30 ? 30 : 0);
      } else {
        startTime.setHours(10, 0, 0, 0);
      }

      const slots = [];

      while (startTime < endTime) {
        const formattedTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const slotDateKey = `${startTime.getDate()}_${startTime.getMonth() + 1}_${startTime.getFullYear()}`;
        const isAvailable = !docInfo?.slots_booked?.[slotDateKey]?.includes(formattedTime);

        if (isAvailable) {
          slots.push({ datetime: new Date(startTime), time: formattedTime });
        }

        startTime.setMinutes(startTime.getMinutes() + 30);
      }

      generatedSlots.push(slots);
    }

    setDocSlots(generatedSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book appointment');
      return navigate('/login');
    }

    const date = docSlots[slotIndex][0].datetime;
    const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctosData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return docInfo ? (
    <div className="bg-gradient-to-b from-white to-gray-100 px-4 py-10 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="w-full lg:w-1/3">
            <img
              src={docInfo.image}
              alt="Doctor"
              className="rounded-2xl shadow-lg w-full object-cover aspect-[4/5]"
            />
          </div>

          <div className="w-full lg:w-2/3 bg-white p-8 rounded-2xl shadow-xl">
            <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
              {docInfo.name}{' '}
              <img className="w-5" src={assets.verified_icon} alt="verified" />
            </h1>
            <p className="mt-2 text-gray-500">
              {docInfo.degree} • {docInfo.speciality}
            </p>
            <div className="mt-3 text-gray-600">
              <p className="font-semibold">About</p>
              <p className="mt-1 text-sm leading-relaxed">{docInfo.about}</p>
            </div>
            <p className="mt-4 font-medium text-gray-700">
              Appointment Fee:{' '}
              <span className="text-primary font-semibold">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking slots */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🕒 Choose a Slot
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {docSlots.map((day, index) => (
              <div
                key={index}
                onClick={() => {
                  setSlotIndex(index);
                  setSlotTime('');
                  setFormattedDate('');
                }}
                className={`min-w-[80px] text-center py-3 px-2 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105 border
                  ${slotIndex === index ? 'bg-indigo-600 text-white font-bold' : 'bg-white text-gray-800'}
                `}
              >
                <p className="text-sm font-semibold">
                  {day[0] && daysOfWeek[day[0].datetime.getDay()]}
                </p>
                <p className="text-lg">
                  {day[0] && day[0].datetime.getDate()}
                </p>
                {index === 0 && <p className="text-xl text-black-600 font-semibold">Today</p>}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {docSlots[slotIndex]?.map((slot, index) => (
              <button
                key={index}
                onClick={() => {
                  setSlotTime(slot.time);

                  const dateObj = new Date(slot.datetime);
                  const formatted = `${dateObj.getDate()} ${dateObj.toLocaleString(
                    'default',
                    { month: 'long' }
                  )} ${dateObj.getFullYear()}`;
                  setFormattedDate(formatted);
                }}
                className={`px-5 py-2 rounded-full text-sm transition duration-300
                  ${slot.time === slotTime ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}
                `}
              >
                {slot.time}
              </button>
            ))}
          </div>

          {slotTime && formattedDate && (
            <p className="mt-6 text-lg text-gray-700 font-medium">
              Selected Slot: {formattedDate} | {slotTime}
            </p>
          )}

          <button
            onClick={bookAppointment}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-10 rounded-full transition-all duration-300"
          >
            Confirm Appointment
          </button>
        </div>

        <div className="mt-20">
          <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
      </div>
    </div>
  ) : null;
};

export default Appointment;
