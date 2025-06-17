const express = require('express')
const router = express.Router();
const app = express()
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')

const usersPath = path.join(__dirname, '../data/users.json')

//load users
function loadUsers() {
    if (!fs.existsSync(usersPath)) return [];
    const data = fs.readFileSync(usersPath);
    return JSON.parse(data);
}
//safe users
 function saveUsers(users) {
    fs.writeFileSync(usersPath, JSON.stringify(users, null,2));
 }

 //POST /auth/register
 router.post('/register', async (req,res)=>{
    const{username,password} = req.body;
    if(!username || !password)
        return res.status(400).json({message: "Username and password required"});

    const users = loadUsers();
    if(users.find(u => u.username === username))
        return res.status(409).json({message:'User already exists'});

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({username, password: hashedPassword});
    saveUsers(users);

    res.status(201).json({message:'User registration successful'})
 });

 //POST /auth/login
 router.post('/login', async (req,res)=> {
    const{username,password} = req.body;
    const users = loadUsers();
    const user = users.find(u=> u.username ===username);
    if(!user) return res.status(401).json({message:'Invalid credentials'});

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({message:'Invalid credentials'});

    res.json({message:'Login successful'})
 });

 module.exports = router;
