const Candidate = require('../models/Candidate.js');

module.exports = function(agenda) {
  agenda.define('CONDITION_IF_ELSE', async (job, done) => {
    const { userId } = job.attrs.data

    try {
      const {status, lastMailed, step: {children, value}} = await Candidate.findById(userId).populate('step')
      const child = eval(value)? children[0] : children[1]

      await Candidate.findByIdAndUpdate(
        userId, { $set: { step: child }}
      )

      const { step } = await Candidate.findById(userId).populate('step');
      step && agenda.schedule(value, `${step.type}_${step.method}`, { userId });
      done()
    } catch (e) {
      done(e);
    }
  });
};
