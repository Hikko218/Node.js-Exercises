const express = require('express');
const app = express();
const router = express.router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const usersPath = path.join(__dirname,'../data/users.json');

//user load function
function loadUsers() {
    if(!fs.existsSync(usersPath)) return [];
    const data = fs.readfileSync(usersPath);
    return JSON.parse(data);
}

//user safe function
function safeUsers(users){
    fs.writeFileSync(usersPath,JSON.stringify(users,null,2));
}

//Post user registration
app.post('./registration', async (req,res) =>{
    const{username, password} = req.body;
    const users = loadUsers();

    if(!username || !password)
        return res.status(401).json({message:'username and password required'});

    if (users.find(u => u.username === username))
        return res.status(409).json({message:'username already exists'});

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({username, password: hashedPassword});

    safeUsers();

    res.status(201).json({message:'Registration successfull'})

})