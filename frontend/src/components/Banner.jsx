import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className='relative bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] rounded-3xl px-8 sm:px-12 md:px-16 py-16 shadow-2xl overflow-hidden'>

            {/* Decorative Blur Effects */}
            <div className='absolute top-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl pointer-events-none'></div>
            <div className='absolute bottom-0 right-0 w-56 h-56 bg-white opacity-10 rounded-full blur-3xl pointer-events-none'></div>

            {/* Content Container */}
            <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10'>

                {/* Left Side Content */}
                <div className='md:w-1/2 text-center md:text-left'>
                    <h1 className='text-4xl sm:text-5xl font-bold text-white leading-snug drop-shadow-md'>
                        Find Your Trusted Doctor
                    </h1>
                    <p className='mt-4 text-white text-base sm:text-lg font-light opacity-90 leading-relaxed'>
                        Book appointments with certified experts and get personalized consultations from the best in the field.
                    </p>
                    <button 
                        onClick={() => { navigate('/login'); scrollTo(0, 0); }}
                        className='mt-6 inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full text-gray-900 text-base font-semibold shadow-lg hover:scale-105 transition-transform duration-300'
                    >
                        Get Started
                    </button>
                </div>

                {/* Right Side Image */}
                <div className='mt-10 md:mt-0 md:w-1/2 flex justify-center'>
                    <div className='bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/30'>
                        <img className='w-full max-w-md rounded-xl' src={assets.appointment_img} alt="Appointment" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Banner;
