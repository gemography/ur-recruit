const {
  show,
  create,
  update,
  remove,
} = require('../controllers/WorkflowController');

module.exports = (server) => {
  server.route('/api/pipelines/:pipeline_id/workflows').post(create);
  server.route('/api/pipelines/:pipeline_id/workflows/:id').delete(remove);
  server.route('/api/workflows/:id').get(show).put(update);
};
