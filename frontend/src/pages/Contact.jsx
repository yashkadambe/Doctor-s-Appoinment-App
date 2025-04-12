import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#dff1ff] via-[#f5f9ff] to-[#e0f7fa] py-16 px-6 flex flex-col items-center">

      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-wide">
          CONNECT <span className="text-primary">WITH US</span>
        </h2>
        <p className="text-gray-600 mt-2 text-sm">We're here to help. Let’s talk.</p>
      </div>

      {/* Contact Card */}
      <div className="backdrop-blur-md bg-white/70 rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row items-center max-w-5xl w-full gap-10">
        
        {/* Image */}
        <img
          src={assets.contact_image}
          alt="Contact Us"
          className="w-full md:w-[350px] rounded-xl shadow-lg hover:scale-105 transition duration-500"
        />

        {/* Info */}
        <div className="flex-1 space-y-6 text-gray-700 text-[15px]">
          <div>
            <h3 className="font-semibold text-lg text-gray-800">🏢 OUR OFFICE</h3>
            <h4 className='font-bold'>MediSphere Healthcare Pvt. Ltd.</h4>
            <p className="mt-1">5th Floor, Zenith Tech Park,<br />MG Road, Bengaluru – 560001,<br />
            Karnataka, India</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">📞 CONTACT DETAILS</h3>
            <p className="mt-1">Tel: (415) 555-0132<br />Email: contact@medisphere.in</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">🚀 CAREERS AT MEDISPHERE</h3>
            <p className="mt-1">Learn more about our teams and job openings.</p>
          </div>
          <button className="mt-4 bg-primary text-white px-8 py-3 rounded-full shadow hover:shadow-lg hover:bg-black transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
