const express = require('express');
const mongoose = require('mongoose');

// Route Imports
const OptionRoutes = require('./api/routes/OptionRoutes');
const WorkflowRoutes = require('./api/routes/WorkflowRoutes');

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

OptionRoutes(server);
WorkflowRoutes(server);

server.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log(`Server running on port: ${PORT}`);
});
