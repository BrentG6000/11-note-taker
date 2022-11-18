const path = require('path');
const router = require('express').Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
let dbPath = path.join(__dirname, '..', 'db', 'db.json');

// Returns notes from db.json
router.get('/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        err ? console.error(err) : res.send(data)
    });
});

// Takes note from req.body and saves it db.json. Returns the new note.
router.post('/notes', (req, res) => {
    if (req.body != {}) {
        let fileData; // Will use to hold new note
        fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            fileData = JSON.parse(data); // Old notes from db.json saved to fileData
            let newData = { ...req.body, id: uuidv4() } // Give new note a unique id
            fileData.push(newData); // Add new note to old notes
            // New note list is writen to db.json
            fs.writeFile(dbPath, JSON.stringify(fileData, null, 2), (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.end(JSON.stringify(newData)); // New note returned
                    console.log("Note logged.");
                }
            });  
        }})
    }
    else {
        res.status(500).json('Error in posting note');
    }
});

module.exports=router