const {
  create,
  update
} = require('../controllers/StageController');

module.exports = (server) => {
  server.route('/api/stages/:id').put(update);
  server.route('/api/pipelines/:pipeline_id/stages').post(create);
};
