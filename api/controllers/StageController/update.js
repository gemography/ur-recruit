const Stage = require('../../models/Stage');

const update = async (req, res) => {
  const { candidate_id, to_stage_id } = req.body;
  const { id } = req.params;

  try {
    await Stage.findByIdAndUpdate(
      id, { $pull: { candidates: candidate_id }}
    )
    await Stage.findByIdAndUpdate(
      to_stage_id, { $push: { candidates: candidate_id }}
    )
    res.status(200).json({ msg: 'Successfully Updated' });
  }catch (e){
    res.status(400).json({ error: e });
  }
};

module.exports = { update };
