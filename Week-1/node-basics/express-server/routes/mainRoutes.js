const express = require('express')
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Start-Page via Router');
});

router.get('/info', (req,res) => {
    res.send('Info-Page via Router')
});

module.exports = router;