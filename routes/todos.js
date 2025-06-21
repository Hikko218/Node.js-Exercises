const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const Task = require('../models/Task');

// Aufgabe erstellen
router.post('/', authenticateToken, async (req, res) => {
  const { text, done } = req.body;

  if (!text) return res.status(400).json({ message: 'Text fehlt' });

  try {
    const newTask = new Task({
      text,
      done: !!done,
      userId: req.user.id
    });

    await newTask.save();
    res.status(201).json({ message: 'Aufgabe gespeichert', task: newTask });
  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Speichern' });
  }
});

// Alle Aufgaben des eingeloggten Users
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Laden' });
  }
});

module.exports = router;
