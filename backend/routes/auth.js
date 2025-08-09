const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'secret';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Usuário já existe' });
    const user = new User({ name, email, password, role });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no registro' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciais inválidas' });
    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: 'Credenciais inválidas' });
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no login' });
  }
});

router.post('/forgot', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });
    user.password = password;
    await user.save();
    res.json({ message: 'Senha atualizada' });
  } catch (err) {
    res.status(500).json({ message: 'Erro na recuperação' });
  }
});

module.exports = router;
