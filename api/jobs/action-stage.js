const Candidate = require('../models/Candidate.js');
const Option = require('../models/Option.js');
const Stage = require('../models/Stage');

module.exports = function(agenda) {
  agenda.define('ACTION_STAGE', async (job, done) => {
    const { userId } = job.attrs.data

    try {
      const { step: {value}} = await Candidate.findById(userId).populate('step');

      const stage = await Stage.findOne({candidates: userId})
      if(stage) {
        console.log(stage)
        await Stage.findByIdAndUpdate(
          stage._id, { $pull: { candidates: userId }}
        )
      }

      await Stage.findByIdAndUpdate(
        value, { $push: { candidates: userId }}
      )

      const step = await Option.findOne({ value, type: "EVENT", method: "STAGE" });

      if(step) {
        await Candidate.findByIdAndUpdate(
          userId, { $set: { step: step._id }}
        )

        agenda.now("EVENT_STAGE", { userId });
      }
      done()
    } catch (e) {
      done(e);
    }
  });
};
