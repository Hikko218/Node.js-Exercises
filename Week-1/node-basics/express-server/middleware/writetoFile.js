const fs = require('fs');

async function logReq (req,res,next) { 
    const logMessage = `Log: Access ${req.method} ${req.url} ${new Date(). toLocaleString()}\n`

    fs.appendFile('server.log', logMessage, (err) => {
        if (err) {
        console.error('Error writing file', err);
        } else {
        console.log('Write log')
        }
        next()
    });
};

module.exports = logReq;


