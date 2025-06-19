const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  uploadMiddleware,
  uploadRecord,
  getAllRecords,
  annotateRecord,
} = require('../controllers/recordController');

router.post('/upload', uploadMiddleware, uploadRecord);
router.get('/all', getAllRecords);
router.post('/annotate/:recordId', annotateRecord);

module.exports = router;
