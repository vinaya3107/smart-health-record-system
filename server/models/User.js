const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  aadhar: String, // hashed
  password: String,
  role: { type: String, enum: ['doctor', 'patient'] },
});

module.exports = mongoose.model('User', userSchema);
