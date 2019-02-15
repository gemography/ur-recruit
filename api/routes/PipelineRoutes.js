const {
  index,
} = require('../controllers/PipelineController');

module.exports = (server) => {
  server.route('/api/pipelines').get(index);
};
