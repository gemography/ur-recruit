const {
  index,
  create,
} = require('../controllers/PipelineController');

module.exports = (server) => {
  server.route('/api/pipelines').get(index).post(create);
};
