const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  patientId: String,
  doctorId: String,
  recordType: String,
  fileUrl: String,
  notes: String,
});

module.exports = mongoose.model('Record', recordSchema);
