import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
    return (
        <div className='relative bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] rounded-3xl px-6 sm:px-10 lg:px-20 pt-20 pb-40 sm:pb-32 overflow-hidden shadow-2xl'>

            {/* Background Glows */}
            <div className='absolute top-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl pointer-events-none'></div>
            <div className='absolute bottom-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full blur-2xl pointer-events-none'></div>

            {/* Content */}
            <div className='max-w-5xl mx-auto flex flex-col items-center text-center relative z-10'>

                <h1 className='text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-md'>
                    Care That Puts You First
                </h1>

                <p className='mt-6 text-white text-base sm:text-lg font-light max-w-2xl'>
                    Discover top-rated doctors, browse profiles, and book appointments in seconds—your health, your schedule, your way.
                </p>

                {/* Profile section */}
                <div className='mt-8 bg-white/20 backdrop-blur-md p-4 px-6 sm:px-10 rounded-xl shadow-lg flex items-center gap-4 flex-wrap justify-center'>
                    <img className='w-20 sm:w-24' src={assets.group_profiles} alt="Profiles" />
                    <p className='text-white text-sm sm:text-base font-light text-center'>
                        100+ verified professionals ready to help. <br className='block sm:hidden' />
                        Zero hassle, maximum care.
                    </p>
                </div>

                {/* CTA Button - moved above image */}
                <a 
                    href='#speciality'
                    className='mt-8 inline-flex items-center gap-2 bg-white text-gray-800 px-8 py-3 rounded-full text-sm font-semibold hover:scale-105 transition-all duration-300 shadow-md z-20'
                >
                    Book Appointment 
                    <img className='w-3' src={assets.arrow_icon} alt="arrow" />
                </a>
            </div>

            {/* Doctor Image - Positioned Lower on Large, Centered on Small */}
            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 sm:right-10 sm:left-auto sm:translate-x-0 max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] z-10'>
                <img 
                    className='w-full h-auto object-contain drop-shadow-2xl' 
                    src={assets.header_img} 
                    alt="Doctor illustration" 
                />
            </div>
        </div>
    );
};

export default Header;
