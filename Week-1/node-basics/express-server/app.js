const express = require('express');
const app = express();

//Middleware
const logger = require('./middleware/logger');
app.use(logger);
const logReq = require ('./middleware/writetoFile');
app.use(logReq);

//Parse JSON-Body
app.use(express.json());

//Import Routes
const mainRoutes = require('./routes/mainRoutes')

//Use Routes
app.use('/', mainRoutes)


app.get('/', (req,res) => {
    res.send('Hello from Server');
});

app.get('/about', (req,res) => {
    res.send('This is an About-Page');
});

app.post('/echo', (req,res) =>{
    res.json({ received: req.body});
});

app.listen(3000, () => console.log('Express-Server runs at Port 3000'));