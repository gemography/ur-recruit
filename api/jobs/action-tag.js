const Candidate = require('../models/Candidate.js');
const Option = require('../models/Option.js');

module.exports = function(agenda) {
  agenda.define('ACTION_TAG', async (job, done) => {
    const { userId } = job.attrs.data

    try {
      const { step: {value}} = await Candidate.findById(userId).populate('step')

      await Candidate.findByIdAndUpdate(
        userId, { $set: { tag: value }
      })

      const step = await Option.findOne({ value, type: "EVENT", method: "TAG" });
      if(step) {
        await Candidate.findByIdAndUpdate(
          userId, {$set: { step: step._id }
        })
        agenda.now("EVENT_TAG", { userId });
      }

      done()
    } catch (e) {
      done(e);
    }
  });
};
