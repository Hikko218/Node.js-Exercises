const express = require('express');
const router  = express.router();
const path    = require('path');
const fs      = require('fs');
const bcrypt  = require ('bcrypt');

const usersPath = path.join(__dirname,' ../data/users.json');

//Load users function
function loadUsers(){
    if(!fs.existsSync(usersPath)) return [];
    const data = fs.readFileSync(usersPath);
    return JSON.parse(data);
}

//safe users function
function safeUsers(users){
    fs.writeFileSync(usersPath, JSON.stringify(users,null,2));
}

//POST user registration
router.POST('./registration', async (req,res) =>{
    const {username, password} = req.body;
    const users = loadUsers();

    if(!username || !password)
        return res.status(401).json({message:'username and password required'});

    if (users.find(u => u.username === username))
        return res.status(400).json({message:'user already exists'});

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({username, password: hashedPassword});

    safeUsers(users)

    res.status(200).json({message:'registration successfull'})
})

//Post user login
router.POST('./login', async (req,res) =>{
    const {username, password} = req.body;
    const users = loadUsers();

    const user = users.find(u => u.username === username);
    if(!user) return res.status(400).json({message:'user doesnt exists'});

    const valid = await bcrypt.compare(user.password === password)

    if(!valid) return res.status(400).json({message:'invalid password'});

    res.json({message:'Login successfull'})
});

//Get verify user
const authenticateToken = required('./authMiddlerware')

router.GET('./verify', authenticateToken, (req,res) => {
    res.status(200).json({message:`${req.user.username}: verify success`})
})

module.export = router;

