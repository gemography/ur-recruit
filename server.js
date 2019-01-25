const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

// Initialize Server
const server = express();

// Middleware
server.use(express.json());

// Connect to MongDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Initialize PORT
const PORT = process.env.PORT || 5000;

server.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log(`Server running on port: ${PORT}`);
});
