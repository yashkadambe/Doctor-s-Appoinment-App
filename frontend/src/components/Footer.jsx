import React from 'react';
import { assets } from '../assets/assets';
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#f8f9fa] text-gray-700 px-6 md:px-20 py-12">
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-10">

        {/* Logo & Description */}
        <div>
          <img src={assets.logo} alt="MediSphere Logo" className="w-36 mb-4" />
          <p className="text-sm leading-relaxed">
            MediSphere brings you the best in healthcare by making doctor consultations and appointments easy and accessible. Wherever you are, we’re here for your health.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
            <Link to="/doctors" className="hover:text-blue-600 transition-colors">All Doctors</Link>
            <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <ul className="text-sm space-y-3">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-600" /> +91-6260213299
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-600" /> yashkadambe14@gmail.com
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="text-gray-600 hover:text-blue-500 transition"><FaFacebook /></a>
            <a href="#" className="text-gray-600 hover:text-blue-400 transition"><FaTwitter /></a>
            <a href="#" className="text-gray-600 hover:text-pink-600 transition"><FaInstagram /></a>
            <a href="#" className="text-gray-600 hover:text-blue-700 transition"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t mt-10 pt-6 text-center text-xs text-gray-500">
        © 2024 MediSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
