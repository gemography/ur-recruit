const Stage = require('../../models/Stage');
const Pipeline = require('../../models/Pipeline');

const remove = async (req, res) => {
  const { pipeline_id, id } = req.params;

  try {
    await Pipeline.findByIdAndUpdate(
      pipeline_id, { $pull: { stages: id }}
    )
    await Stage.deleteOne({ _id: id })
    res.status(204).json({ });
  } catch(err) {
    res
      .status(500)
      .json({ err, msg: 'There was an error deleting the workflow' });
  }
};

module.exports = { remove };
