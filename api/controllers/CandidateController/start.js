const Candidate = require('../../models/Candidate');
const agenda = require('../../agenda.js');

const start = async (req, res) => {
  const { userId } = req.body;

  const candidate = await Candidate.findById(userId).populate('step');
  if(candidate.step.children.length > 0) {
    agenda.now(`${candidate.step.type}_${candidate.step.method}`, {
      userId: candidate.id
    });
  }
  res.status(200).json({ msg: 'agenda run' });
};

module.exports = { start };
