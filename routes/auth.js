const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config(); 

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY; // optional in .env

// POST /auth/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username und Passwort erforderlich.' });

  try {
    const userExists = await User.findOne({ username });
    if (userExists)
      return res.status(409).json({ message: 'Benutzer existiert bereits.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'Benutzer registriert.' });
  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Registrieren.' });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Ungültige Anmeldedaten' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Ungültige Anmeldedaten' });

    const token = jwt.sign({ username: user.username, id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login erfolgreich', token });
  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Login.' });
  }
});

module.exports = router;

