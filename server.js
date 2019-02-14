const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Agendash = require('agendash');
const agenda = require('./api/agenda');

const { mongoURI: db, clientURI } = require('./config/keys');

const OptionRoutes = require('./api/routes/OptionRoutes');
const WorkflowRoutes = require('./api/routes/WorkflowRoutes');
const CandidateRoutes = require('./api/routes/CandidateRoutes');
const PipelineRoutes = require('./api/routes/PipelineRoutes');
const StageRoutes = require('./api/routes/StageRoutes');

const corsOptions = {
  origin: clientURI
};

const server = express();

server.use(express.json());
server.use(cors(corsOptions));
server.use('/dash', Agendash(agenda));

mongoose.connect(db).connection

const PORT = process.env.PORT || 5000;

OptionRoutes(server);
WorkflowRoutes(server);
CandidateRoutes(server);
PipelineRoutes(server);
StageRoutes(server);

server.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log(`Server running on port: ${PORT}`);
});
