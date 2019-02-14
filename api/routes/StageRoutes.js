const {
  update,
} = require('../controllers/StageController');

module.exports = (server) => {
  server.route('/api/stages/:id').put(update);
};
