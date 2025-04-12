import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      const endpoint = state === 'Sign Up' ? '/api/user/register' : '/api/user/login'
      const payload = state === 'Sign Up' ? { name, email, password } : { email, password }

      const { data } = await axios.post(`${backendUrl}${endpoint}`, payload)

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/login')
    }
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl text-gray-800 backdrop-blur"
      >
        <h2 className="text-3xl font-bold mb-2 text-primary text-center">
          {state === 'Sign Up' ? 'Create Account' : 'Welcome Back!'}
        </h2>
        <p className="mb-6 text-sm text-center text-gray-600">
          {state === 'Sign Up'
            ? 'Sign up to book your appointment'
            : 'Login to book your appointment'}
        </p>

        {state === 'Sign Up' && (
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 focus:outline-primary focus:ring-1 focus:ring-primary"
              placeholder="Your Name"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 focus:outline-primary focus:ring-1 focus:ring-primary"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-4 relative">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 focus:outline-primary focus:ring-1 focus:ring-primary"
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-sm text-primary"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 mt-2 rounded-lg hover:bg-indigo-600 transition duration-200"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <div className="mt-4 text-sm text-center">
          {state === 'Sign Up' ? (
            <p>
              Already have an account?{' '}
              <span
                className="text-primary cursor-pointer underline"
                onClick={() => setState('Login')}
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              New here?{' '}
              <span
                className="text-primary cursor-pointer underline"
                onClick={() => setState('Sign Up')}
              >
                Create an account
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Login
