const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Middleware
app.use(express.json()); // Allows json to be read
app.use(express.urlencoded({ extended: true })); // Allows requests to be read
app.use(express.static('public')); // Allows access to static files in the public folder
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () =>
    console.log(`Listening for requests on port ${PORT}! 🏎️`)
);
