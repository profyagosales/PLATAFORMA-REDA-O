const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const service = require('../services/teacherService');

// all routes below require admin/teacher role
router.use(admin);

// Theme CRUD
router.get('/themes', (req, res) => {
  res.json(service.listThemes());
});

router.post('/themes', (req, res) => {
  const theme = service.createTheme(req.body);
  res.status(201).json(theme);
});

router.put('/themes/:id', (req, res) => {
  const theme = service.updateTheme(req.params.id, req.body);
  if (!theme) return res.status(404).json({ error: 'Tema não encontrado' });
  res.json(theme);
});

router.delete('/themes/:id', (req, res) => {
  const success = service.removeTheme(req.params.id);
  res.json({ success });
});

// Student management
router.get('/students', (req, res) => {
  res.json(service.listStudents());
});

router.post('/students', (req, res) => {
  const student = service.addStudent(req.body);
  res.status(201).json(student);
});

router.delete('/students/:id', (req, res) => {
  const success = service.removeStudent(req.params.id);
  res.json({ success });
});

// Corrections
router.get('/corrections', (req, res) => {
  res.json(service.listCorrections());
});

router.post('/corrections', (req, res) => {
  const correction = service.addCorrection(req.body);
  res.status(201).json(correction);
});

module.exports = router;
