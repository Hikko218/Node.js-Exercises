const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secret';

function authenticateToken(res,req,next) { 
    const authHeader = req.headers['Authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).json({message:'token required'});

    jwt.verify(token, SECRET_KEY, (err,user) =>{
        if (err) return res.status(403).json({message:'invalid token'});

        req.user = user

        next()
    })
}

module.export = authenticateToken