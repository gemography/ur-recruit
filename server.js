const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { mongoURI: db, clientURI } = require('./config/keys');

const OptionRoutes = require('./api/routes/OptionRoutes');
const WorkflowRoutes = require('./api/routes/WorkflowRoutes');
const CandidateRoutes = require('./api/routes/CandidateRoutes');

const corsOptions = {
  origin: clientURI
};

const server = express();

server.use(express.json());
server.use(cors(corsOptions));

mongoose.connect(db).connection

const PORT = process.env.PORT || 5000;

OptionRoutes(server);
WorkflowRoutes(server);
CandidateRoutes(server);

server.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log(`Server running on port: ${PORT}`);
});
