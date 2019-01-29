const {
  create
} = require('../controllers/OptionController');

module.exports = (server) => {
  server.route('/api/options').post(create);
};
