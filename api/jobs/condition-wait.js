const Candidate = require('../models/Candidate.js');

module.exports = function(agenda) {
  agenda.define('CONDITION_WAIT', async (job, done) => {
    const { userId } = job.attrs.data
    try {
      const candidate = await Candidate.findById(userId).populate('step')

      await Candidate.updateOne(
        { _id: userId },
        { $set: {
          step: candidate.step.children[0]
        }}
      ).populate('step')

      const newCandidate = await Candidate.findById(userId).populate('step')
      if(newCandidate.step) {
        agenda.schedule("in 10 seconds", `${newCandidate.step.type}_${newCandidate.step.method}`, {
          userId: newCandidate.id
        });
      }
      done()
    } catch (e) {
      done(e);
    }
  });
};
