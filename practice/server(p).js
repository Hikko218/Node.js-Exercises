const express = require('express');
const app = express();
const authRoutes = require('./routes/auth')

app.use(express.json());

app.use('./auth',authRoutes);

app.get('./', (req,res) =>{
    res.json({message:'Hello from Server'});
})

app.listen(3000, (req,res)=>{
    console.log('Server runs at http://localhost:3000')
})

