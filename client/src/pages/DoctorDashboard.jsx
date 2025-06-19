import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import API from '../api/axios';

export default function DoctorDashboard() {
  const [records, setRecords] = useState([]);
  const [selectedNote, setSelectedNote] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await API.get('/records/all');
        setRecords(res.data);
      } catch (err) {
        toast.error('Failed to fetch records');
      }
    };
    fetchRecords();
  }, []);

  const handleNoteSubmit = async (recordId) => {
    try {
      await API.post(`/records/annotate/${recordId}`, {
        doctorId: user._id,
        notes: selectedNote,
      });
      toast.success('Note added');
      setSelectedNote('');
    } catch (err) {
      toast.error('Failed to add note');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
      {records.map((record) => (
        <div key={record._id} className="bg-white rounded shadow p-4 mb-4">
          <p><strong>Patient ID:</strong> {record.patientId}</p>
          <p><strong>Record Type:</strong> {record.recordType}</p>
          <a href={record.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            View Record
          </a>

          <textarea
            placeholder="Add a note..."
            value={selectedNote}
            onChange={(e) => setSelectedNote(e.target.value)}
            className="w-full mt-3 border rounded px-3 py-2"
          />
          <button
            onClick={() => handleNoteSubmit(record._id)}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Note
          </button>
        </div>
      ))}
    </div>
  );
}
