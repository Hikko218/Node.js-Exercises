const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const path = require('path')

const dataPath = path.join(__dirname,'../Data/notes.json')

router.get('/get', async (req,res) => {
    try {
        const fileContent = await fs.readFile(dataPath, 'utf8');
        const notes = JSON.parse(fileContent);
        res.json(notes);                                        
    } catch (err) {
        console.error('Error reading or parsing file');
        res.status(500).json({error:'Error reading or parsing file'})
    }  
});

router.post('/post', async (req,res) => {
    try {
        let data = req.body
        data.id = new Date(). toLocaleString();
        const notes = await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
        console.log('Notes saved in file')
        res.json({message:'Notes saved in file'})
    } catch (err) {
        console.error('Error saving files',err);
        res.status(500).json({message:'Error saving file', error: err})
    }
});

module.exports = router