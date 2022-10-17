const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.port || 3001;
let notesPath = path.join(__dirname, '..', '..', 'notes.html');
let indexPath = path.join(__dirname, '..', '..', 'index.html');
let dbPath = path.join(__dirname, '..', '..', '..', 'db', 'db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('./notes', (req, res) => res.sendFile(notesPath));

app.get('./api/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        err ? console.error(err) : res.send(data)
    });
});

app.get('*', (req, res) => res.sendFile(indexPath));

app.post('./api/notes', (req, res) => {
    // fs.writeFile(dbPath, req.body, (err) => {
    //     if (err)
    //         console.log(err);
    //     else {
    //         res.send(req.body);
    //     }
    res.send(req.body);
});

app.listen(PORT, () =>
    console.log(`Listening for requests on port ${PORT}! 🏎️`)
);

// To turn on nodemon: npx nodemon server.js

// fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });