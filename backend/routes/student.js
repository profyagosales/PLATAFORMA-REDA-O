const express = require('express');
const multer = require('multer');
const storageService = require('../services/storage');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/png',
      'image/jpeg'
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

router.post('/essays', upload.single('file'), async (req, res) => {
  try {
    const url = await storageService.uploadFile(req.file);
    res.json({ url });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
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
