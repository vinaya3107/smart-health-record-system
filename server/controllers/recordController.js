const Record = require('../models/Record');
const multer = require('multer');
const path = require('path');

// Upload config
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

exports.uploadMiddleware = upload.single('file');

exports.uploadRecord = async (req, res) => {
  const { patientId } = req.body;
  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;

  const record = new Record({
    patientId,
    fileUrl,
    recordType: req.file.mimetype,
  });

  await record.save();
  res.status(201).json({ message: 'Record uploaded' });
};

exports.getAllRecords = async (req, res) => {
  const records = await Record.find();
  res.json(records);
};

exports.annotateRecord = async (req, res) => {
  const { recordId } = req.params;
  const { doctorId, notes } = req.body;

  await Record.findByIdAndUpdate(recordId, { doctorId, notes });
  res.json({ message: 'Note added' });
};
