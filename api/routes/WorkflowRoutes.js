const {
  show,
  create
} = require('../controllers/WorkflowController');

module.exports = (server) => {
  server.route('/api/pipelines/:pipeline_id/workflows').post(create);
  server.route('/api/workflows/:id').get(show);
};
