import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../api/axios';

export default function Login() {
  const [aadhar, setAadhar] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{12}$/.test(aadhar)) {
      return toast.error('Enter a valid 12-digit Aadhar number');
    }
    try {
      const res = await API.post('/auth/login', { aadhar, password });
      localStorage.setItem('user', JSON.stringify(res.data));
      toast.success('Login successful');
      if (res.data.role === 'doctor') {
        navigate('/doctor');
        window.location.reload(); // force App.js to pick up user from localStorage
      } else {
        navigate('/patient');
        window.location.reload(); // same here
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-100 to-blue-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Smart Health Login</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Aadhar Number</label>
        <input
          type="text"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          placeholder="Enter 12-digit Aadhar"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Log In
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <span
            onClick={() => navigate('/signup')}
            className="ml-1 text-indigo-600 hover:underline cursor-pointer"
          >
            Sign up here
          </span>
        </p>
      </form>
    </div>
  );
}
