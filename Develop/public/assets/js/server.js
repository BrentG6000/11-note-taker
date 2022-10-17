const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

let notesPath = path.join(__dirname, '..', '..', 'notes.html');
let indexPath = path.join(__dirname, '..', '..', 'index.html')
// Middleware needed?

app.get('/notes', (req, res) => res.sendFile(notesPath));

app.get('*', (req, res) => res.sendFile(indexPath));

/* Example get and post
app.get('/', (req, res) => res.json(`GET route`));
app.post('/', (req, res) => res.json(`POST route`));
*/

app.listen(PORT, () =>
    console.log(`Listening for requests on port ${PORT}! 🏎️`)
);

// To turn on nodemon: npx nodemon server.js
// Use Insomnia for api calls