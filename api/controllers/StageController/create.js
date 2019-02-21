const Stage = require('../../models/Stage');
const Pipeline = require('../../models/Pipeline');

const create = async (req, res) => {
  const { pipeline_id } = req.params
  const { name } = req.body;

  try {
    const stage = await new Stage({ name }).save();
    await Pipeline.findByIdAndUpdate(
      pipeline_id, { $push: { stages: stage._id }}
    )
    res.status(201).json({ stage, msg: 'Successfully created' });
  } catch(err) {
    res
      .status(500)
      .json({ err, msg: 'There was an error saving the stage in the database.' });
  }
};

module.exports = { create };
