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
});

module.exports = router;
