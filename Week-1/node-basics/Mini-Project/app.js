const express = require('express');
const app = express();

//Middleware-Logger
const logger = require('./middleware/logger');
app.use(logger);

//Parse JSON-Body
app.use(express.json());

//Import Routes
const notes = require('./routes/notesApi');

//User Routes
app.use('/notes', notes)

//Home
app.get('/', (req,res) => {
    res.send('Welcome to Backend')
});

//Middleware Error-Handling 404
app.use ((req,res,next) => {
    console.log('Route not found')
    res.status(404).json({error:'Route not found'})
});

app.use((err, req, res, next) => {
    console.error('Server error:',err.stack);
    res.status(500).json({error:'Internal Server Error'});
});

//Start Server
app.listen(3000, () => {
    console.log('Server runs at Port 3000')
});
