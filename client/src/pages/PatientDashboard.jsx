import React, { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../api/axios';

export default function PatientDashboard() {
  const [file, setFile] = useState(null);
  const [accessGranted, setAccessGranted] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const simulateFingerprint = () => {
    const success = Math.random() > 0.1;
    if (success) {
      toast.success('Fingerprint match successful');
      setAccessGranted(true);
    } else {
      toast.error('Fingerprint match failed');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Please select a file');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('patientId', user._id);

    try {
      await API.post('/records/upload', formData);
      toast.success('Health record uploaded');
    } catch (err) {
      toast.error('Upload failed');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome, Patient</h1>

      {!accessGranted ? (
        <div className="text-center">
          <p className="mb-4">Please verify your fingerprint to access your health records.</p>
          <button
            onClick={simulateFingerprint}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Scan Fingerprint
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <form onSubmit={handleUpload} className="bg-white p-4 rounded shadow-md">
            <label className="block mb-2 font-medium">Upload Health Record (PDF/Image)</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full mb-4 border px-3 py-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Upload
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
