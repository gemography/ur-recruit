const Candidate = require('../../../models/Candidate');
const agenda = require('../../../agenda.js');
const Option = require('../../../models/Option.js');

const service = async (req, res) => {
  const { userId } = req.body;
  const { value } = req.params;

  const { _id } = await Option.findOne({ value });

  await Candidate.findByIdAndUpdate(
    userId, { $set: { step: _id }}
  )

  agenda.now("EVENT_WEBHOOK", { userId });
  res.status(200).json({ msg: 'agenda run' });
};

module.exports = { service };
