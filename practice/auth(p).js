const express = require('express');
const app = express();
const router = express.router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const usersPath= path.join(__dirname,'../data/users.json');

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