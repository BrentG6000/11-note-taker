const path = require('path');
const router = require('express').Router();

// Returns notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
});

// All other gets return homepage
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

module.exports = router;