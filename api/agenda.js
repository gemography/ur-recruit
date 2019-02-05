const Agenda = require('agenda');

const connectionOpts = {db: {address: 'localhost:27017/ats', collection: 'jobs'}};

const agenda = new Agenda(connectionOpts);

const jobTypes = ['action-tag', 'action-email', 'action-disqualify'];

jobTypes.forEach(type => {
  require('./jobs/' + type)(agenda);
});

if (jobTypes.length) {
  agenda.start(); // Returns a promise, which should be handled appropriately
}

module.exports = agenda;
