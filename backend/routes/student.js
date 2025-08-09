const express = require('express');
const multer = require('multer');
const Essay = require('../models/essay');
const { checkPlan } = require('../services/payment');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', checkPlan('upload'), upload.single('file'), (req, res) => {
  const { theme } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: 'Arquivo não enviado' });
  }
  const metadata = {
    filename: req.file.filename,
    originalName: req.file.originalname,
    date: new Date(),
    theme,
    status: 'enviado'
  };
  Essay.create(metadata);
  res.json({ success: true, essay: metadata });
});

router.get('/correcoes', checkPlan('correcoes'), (req, res) => {
  res.json({ essays: Essay.all() });
});

router.put('/profile', checkPlan('perfil'), (req, res) => {
  // Aqui apenas retornamos os dados recebidos como confirmação
  res.json({ success: true, profile: req.body });
});

module.exports = router;
