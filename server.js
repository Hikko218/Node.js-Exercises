const express = require('express');
const app = express();
const authRoutes = require('./routes/auth')
const todoRoutes = require('./routes/todos');
require('dotenv').config();
const mongoose = require('mongoose');

app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB verbunden'))
  .catch(err => console.error('❌ Fehler bei MongoDB:', err));

// Routen
app.use('/auth', authRoutes);

app.use('/todos', todoRoutes);

app.get('/', (req,res) => {
    res.status(200).json({message:'Hello from server'});
});

app.listen(3000, ()=> {
    console.log('Server runs on http://localhost:3000');
});
