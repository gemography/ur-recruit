const {
  show,
  create
} = require('../controllers/WorkflowController');

module.exports = (server) => {
  server.route('/api/workflows').post(create);
  server.route('/api/workflows/:id').get(show);
};
