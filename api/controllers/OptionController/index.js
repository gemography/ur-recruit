const { create } = require('./create');
const { update } = require('./update');
const { destroy } = require('./destroy');
const { webhook } = require('./webhook');

module.exports = {
  create,
  update,
  destroy,
  webhook
};
