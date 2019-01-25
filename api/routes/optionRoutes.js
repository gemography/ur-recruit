const {
  addOption
} = require('../controllers/options');

module.exports = (server) => {
  server.route('/api/options').post(addOption);
};
