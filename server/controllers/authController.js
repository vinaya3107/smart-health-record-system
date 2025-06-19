const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
  const { name, aadhar, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedAadhar = await bcrypt.hash(aadhar, 10);

  const user = new User({ name, aadhar: hashedAadhar, password: hashedPassword, role });
  await user.save();

  res.status(201).json({ message: 'User registered' });
};

exports.login = async (req, res) => {
  const { aadhar, password } = req.body;
  const users = await User.find();

  const user = users.find((u) => bcrypt.compareSync(aadhar, u.aadhar));
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, _id: user._id, role: user.role });
};
