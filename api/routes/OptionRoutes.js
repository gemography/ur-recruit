const {
  create,
  update,
  destroy,
} = require('../controllers/OptionController');

const {
  createWebhook,
  service,
} = require('../controllers/OptionController/webhooks');

module.exports = (server) => {
  server.route('/api/workflows/:workflow_id/options').post(create);
  server.route('/api/workflows/:workflow_id/options/:id').put(update);
  server.route('/api/workflows/:workflow_id/options/:id').delete(destroy);
  server.route('/api/webhooks/:value').post(service);
  server.route('/api/workflows/:workflow_id/options/webhooks').post(createWebhook);
};
