const Candidate = require('../models/Candidate.js');

module.exports = function(agenda) {
  agenda.define('CONDITION_WAIT', async (job, done) => {
    const { userId } = job.attrs.data

    try {
      const {step: {children, value}} = await Candidate.findById(userId).populate('step')

      await Candidate.findByIdAndUpdate(
        userId, { $set: { step: children[0] }}
      )

      const { step } = await Candidate.findById(userId).populate('step');
      step && agenda.schedule(value, `${step.type}_${step.method}`, { userId });
      done()
    } catch (e) {
      done(e);
    }
  });
};
