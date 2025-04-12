import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <section className='bg-white text-gray-800'>

      {/* Hero Section */}
      <div className='text-center py-20 px-6 bg-gradient-to-r from-blue-50 via-white to-purple-50'>
        <h1 className='text-4xl md:text-5xl font-bold'>
          About <span className='text-primary'>MediSphere</span>
        </h1>
        <p className='mt-4 max-w-xl mx-auto text-gray-600 text-sm sm:text-base'>
          Bridging the gap between patients and healthcare providers through innovation and compassion.
        </p>
      </div>

      {/* About Content */}
      <div className='flex flex-col lg:flex-row items-center gap-10 px-6 py-16 max-w-7xl mx-auto'>
        <div className='lg:w-1/2'>
          <img src={assets.about_image} alt="About" className='rounded-2xl shadow-2xl w-full h-auto object-cover' />
        </div>
        <div className='lg:w-1/2 text-base text-gray-700'>
          <p className='mb-4'>
            Welcome to <span className='font-bold text-primary'>MediSphere</span>, your one-stop solution for managing doctor appointments, accessing healthcare professionals, and taking control of your health journey.
          </p>
          <p className='mb-4'>
            At MediSphere, we’re passionate about transforming healthcare access using technology. Our team is constantly innovating to ensure that your experience is seamless, secure, and centered around your needs.
          </p>
          <div className='mt-6'>
            <h3 className='text-xl font-semibold text-primary mb-2'>Our Vision</h3>
            <p>
              To create a world where healthcare is just a click away — simple, smart, and accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='bg-[#f9fafb] py-20 px-6 text-center'>
        <h2 className='text-3xl font-bold text-gray-800'>Why <span className='text-primary'>Choose Us?</span></h2>
        <p className='text-gray-500 text-sm max-w-xl mx-auto mt-4 mb-12'>
          We don't just connect you with doctors — we help you experience better healthcare, customized to your life.
        </p>

        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'>
          {/* Card 1 */}
          <div className='group bg-white border border-gray-200 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-400 hover:bg-blue-50'>
            <div className='text-3xl mb-3 transition-transform duration-500 group-hover:scale-110'>⚡</div>
            <h4 className='text-lg font-semibold text-primary group-hover:text-blue-700 mb-2 transition-colors duration-300'>Efficiency</h4>
            <p className='text-sm text-gray-600 group-hover:text-gray-800'>
              Streamlined appointment scheduling that fits your lifestyle, saving you time and energy.
            </p>
          </div>

          {/* Card 2 */}
          <div className='group bg-white border border-gray-200 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-purple-400 hover:bg-purple-50'>
            <div className='text-3xl mb-3 transition-transform duration-500 group-hover:rotate-12'>🌍</div>
            <h4 className='text-lg font-semibold text-primary group-hover:text-purple-700 mb-2 transition-colors duration-300'>Convenience</h4>
            <p className='text-sm text-gray-600 group-hover:text-gray-800'>
              Find top-rated, trusted doctors near you — all in one platform.
            </p>
          </div>

          {/* Card 3 */}
          <div className='group bg-white border border-gray-200 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-pink-400 hover:bg-pink-50'>
            <div className='text-3xl mb-3 transition-transform duration-500 group-hover:scale-125'>🎯</div>
            <h4 className='text-lg font-semibold text-primary group-hover:text-pink-700 mb-2 transition-colors duration-300'>Personalization</h4>
            <p className='text-sm text-gray-600 group-hover:text-gray-800'>
              Get health tips, alerts, and reminders tailored to your medical needs and schedule.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
