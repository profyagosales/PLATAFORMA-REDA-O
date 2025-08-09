const express = require('express');
const fs = require('fs');
const path = require('path');
const Rubric = require('../models/rubric');

const router = express.Router();

// Recebe notas e comentários do professor e gera relatório.
router.post('/grade', (req, res) => {
  const { banca, criteria = [], scores = {}, comments = {}, essayId } = req.body;

  const rubric = new Rubric(banca, criteria);
  const report = rubric.generateReport(scores, comments);

  const reportDir = path.join(__dirname, '../../reports');
  fs.mkdirSync(reportDir, { recursive: true });
  const reportPath = path.join(reportDir, `${essayId || Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  res.json({ success: true, reportPath, report });
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// POST /teacher/feedback
// Receives a video blob and stores it in the uploads directory.
router.post('/feedback', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No video uploaded' });
  }

  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

module.exports = router;
