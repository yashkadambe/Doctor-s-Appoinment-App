import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const togglePassword = () => setShowPass(!showPass);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) return toast.error('Invalid email format.');
    if (password.length < 6) return toast.error('Password must be at least 6 characters.');

    try {
      const route = state === 'Sign Up' ? '/register' : '/login';
      const payload = state === 'Sign Up' ? { name, email, password } : { email, password };
      const { data } = await axios.post(`${backendUrl}/api/user${route}`, payload);

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    if (token) navigate('/login');
  }, [token]);

  return (
    <div className="min-h-[90vh] relative overflow-hidden flex justify-center items-center px-4">
      {/* Background animation */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-300 via-blue-200 to-pink-300 animate-pulse opacity-20 z-0" />

      <form onSubmit={onSubmitHandler} className="relative z-10 bg-white p-8 shadow-2xl rounded-2xl w-full max-w-md space-y-5 border border-gray-100">
        <h2 className="text-3xl font-semibold text-center text-primary">{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
        <p className="text-center text-gray-500 text-sm">{state === 'Sign Up' ? 'Join to book appointments' : 'Welcome back!'}</p>

        {state === 'Sign Up' && (
          <div className="relative">
            <FaUser className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 pl-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 pl-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type={showPass ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border border-gray-300 pl-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {showPass ? (
            <HiEyeOff className="absolute right-3 top-3.5 text-gray-400 cursor-pointer" onClick={togglePassword} />
          ) : (
            <HiEye className="absolute right-3 top-3.5 text-gray-400 cursor-pointer" onClick={togglePassword} />
          )}
        </div>

        <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <p className="text-sm text-center">
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span onClick={() => setState('Login')} className="text-primary font-medium cursor-pointer">Login</span>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <span onClick={() => setState('Sign Up')} className="text-primary font-medium cursor-pointer">Sign Up</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
