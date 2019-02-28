const Candidate = require('../../../models/Candidate');
const agenda = require('../../../agenda.js');
const Option = require('../../../models/Option.js');

const service = async (req, res) => {
  const { email, name } = req.body;
  const { value } = req.params;
  let candidate = null

  const { _id } = await Option.findOne({ value });
  candidate = await Candidate.findOne({ email, name });
  if(!candidate) candidate = await new Candidate({ email, name }).save();

  await Candidate.findByIdAndUpdate(
    candidate._id, { $set: { step: _id }}
  )

  agenda.now("EVENT_WEBHOOK", { userId: candidate._id });
  res.status(200).json({ msg: 'agenda run' });
};

module.exports = { service };
