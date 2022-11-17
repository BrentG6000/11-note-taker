const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
let notesPath = path.join(__dirname, '..', '..', 'notes.html');
let indexPath = path.join(__dirname, '..', '..', 'index.html');
let dbPath = path.join(__dirname, '..', '..', '..', 'db', 'db.json');

// Middleware
app.use(express.json()); // Allows json to be read
app.use(express.urlencoded({ extended: true })); // Allows requests to be read
app.use(express.static('public')); // Allows access to static files in the public folder
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// // Returns homepage
// app.get('/', (req, res) => res.sendFile(indexPath));

// // Returns notes.html
// app.get('/notes', (req, res) => res.sendFile(notesPath));

// Returns notes from db.json
// app.get('/api/notes', (req, res) => {
//     fs.readFile(dbPath, 'utf8', (err, data) => {
//         err ? console.error(err) : res.send(data)
//     });
// });

// // All other gets return homepage
// app.get('*', (req, res) => res.sendFile(indexPath));

// Takes note from req.body and saves it db.json. Returns the new note.
// app.post('/api/notes', (req, res) => {
//     if (req.body != {}) {
//         let fileData; // Will use to hold new note
//         fs.readFile(dbPath, 'utf8', (err, data) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             fileData = JSON.parse(data); // Old notes from db.json saved to fileData
//             let newData = { ...req.body, id: uuidv4() } // Give new note a unique id
//             fileData.push(newData); // Add new note to old notes
//             // New note list is writen to db.json
//             fs.writeFile(dbPath, JSON.stringify(fileData, null, 2), (err) => {
//                 if (err) {
//                     console.log(err);
//                 }
//                 else {
//                     res.end(JSON.stringify(newData)); // New note returned
//                     console.log("Note logged.");
//                 }
//             });  
//         }})
//     }
//     else {
//         res.status(500).json('Error in posting note');
//     }
// });

app.listen(PORT, () =>
    console.log(`Listening for requests on port ${PORT}! 🏎️`)
);
