const {
  index,
} = require('../controllers/PipelineController');

module.exports = (server) => {
  server.route('/api/pipelines/:id').get(index);
};
