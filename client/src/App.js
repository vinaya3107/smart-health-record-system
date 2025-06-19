import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/patient"
            element={user?.role === 'patient' ? <PatientDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/doctor"
            element={user?.role === 'doctor' ? <DoctorDashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}
