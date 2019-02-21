const {
  create,
  update,
  remove
} = require('../controllers/StageController');

module.exports = (server) => {
  server.route('/api/stages/:id').put(update);
  server.route('/api/pipelines/:pipeline_id/stages').post(create);
  server.route('/api/pipelines/:pipeline_id/stages/:id').delete(remove);
};
