import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { setDToken } = useContext(DoctorContext);
  const { setAToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const url = state === 'Admin' ? '/api/admin/login' : '/api/doctor/login';
      const { data } = await axios.post(backendUrl + url, { email, password });
      if (data.success) {
        state === 'Admin' ? setAToken(data.token) : setDToken(data.token);
        localStorage.setItem(state === 'Admin' ? 'aToken' : 'dToken', data.token);
        toast.success('Login Successful!');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Login Failed! Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={onSubmitHandler} className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {state} <span className="text-primary">Login</span>
        </h2>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-2">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-2">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition"
        >
          Login
        </button>
        <p className="text-center text-gray-600 text-sm mt-4">
          {state === 'Admin' ? 'Doctor Login?' : 'Admin Login?'}
          <span
            onClick={() => setState(state === 'Admin' ? 'Doctor' : 'Admin')}
            className="text-primary font-medium cursor-pointer ml-1"
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;