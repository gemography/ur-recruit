const {
  create
} = require('../controllers/WorkflowController');

module.exports = (server) => {
  server.route('/api/workflows').post(create);
};
