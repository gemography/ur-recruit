const {
  create,
  destroy
} = require('../controllers/OptionController');

module.exports = (server) => {
  server.route('/api/options').post(create);
  server.route('/api/options/:id').delete(destroy);
};
