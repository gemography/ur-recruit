const Candidate = require('../models/Candidate.js');

module.exports = function(agenda) {
  agenda.define('ACTION_DISQUALIFY', async (job, done) => {
    const { userId } = job.attrs.data

    try {
      const {step: {children}} = await Candidate.findById(userId).populate('step')

      await Candidate.findByIdAndUpdate(
        userId,
        { $set: {
          status: "DISQUALIFIED",
          step: children[0]
        }}
      )

      const { step } = await Candidate.findById(userId).populate('step')
      step && agenda.now(`${step.type}_${step.method}`, { userId });

      done()
    } catch (e) {
      done(e);
    }
  });
};
