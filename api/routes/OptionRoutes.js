const {
  create,
  destroy,
  webhook
} = require('../controllers/OptionController');

module.exports = (server) => {
  server.route('/api/workflows/:workflow_id/options').post(create);
  server.route('/api/workflows/:workflow_id/options/:id').delete(destroy);
  server.route('/api/options/webhook/:value').post(webhook);
};
