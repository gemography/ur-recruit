const express = require('express');
const mongoose = require('mongoose');

// Route Imports
const optionRoutes = require('./api/routes/optionRoutes');

// Initialize Server
const server = express();

// Middleware
server.use(express.json());

// Connect to MongDB
mongoose.connect('mongodb://localhost:27017/ats');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// Initialize PORT
const PORT = process.env.PORT || 5000;

optionRoutes(server);

server.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log(`Server running on port: ${PORT}`);
});
