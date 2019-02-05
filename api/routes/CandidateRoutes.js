const {
  start
} = require('../controllers/CandidateController');

module.exports = (server) => {
  server.route('/api/candidate/start/').post(start);
};
