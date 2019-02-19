const {
  index,
  create,
  update,
  remove
} = require('../controllers/PipelineController');

module.exports = (server) => {
  server.route('/api/pipelines')
    .get(index)
    .post(create);
  server.route('/api/pipelines/:id').put(update).delete(remove);
};
