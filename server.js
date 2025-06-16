const express = require('express');
const app = express();
const authRoutes = require('./routes/auth')

app.use(express.json());

// Routen
//app.use('/auth', authRoutes);

app.get('/', (req,res) => {
    res.status(200).json({message:'Hello from server'});
});

app.listen(3000, ()=> {
    console.log('Server runs on http://localhost:3000');
});
