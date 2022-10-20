const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.port || 3001;
let notesPath = path.join(__dirname, '..', '..', 'notes.html');
let indexPath = path.join(__dirname, '..', '..', 'index.html');
let dbPath = path.join(__dirname, '..', '..', '..', 'db', 'db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', (req, res) => res.sendFile(notesPath));

app.get('/api/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        err ? console.error(err) : res.send(data)
    });
});

app.get('*', (req, res) => res.sendFile(indexPath));

app.post('/api/notes', (req, res) => {
    if (req.body != {}) {
        let fileData;
        fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            fileData = JSON.parse(data);
            let newData = { ...req.body, id: uuidv4() }
            fileData.push(newData);
            fs.writeFile(dbPath, JSON.stringify(fileData, null, 2), (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.end(JSON.stringify(newData));
                    console.log("Note logged.");
                }
            });  
        }})
    }
    else {
        res.status(500).json('Error in posting note');
    }
    //res.end(JSON.stringify(req.body));
});

app.listen(PORT, () =>
    console.log(`Listening for requests on port ${PORT}! 🏎️`)
);
