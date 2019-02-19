const Workflow = require('../../models/Workflow');
const Pipeline = require('../../models/Pipeline');

const create = async (req, res) => {
  const { pipeline_id } = req.params;
  const { name } = req.body

  try {
    const workflow = await new Workflow({ name }).save();
    await Pipeline.findByIdAndUpdate(
      pipeline_id, { $push: { workflows: workflow._id }}
    )
    res.status(201).json({ workflow, msg: 'Successfully created' });
  } catch(err) {
    res
      .status(500)
      .json({ err, msg: 'There was an error saving the workflow in the database.' });
  }
};

module.exports = { create };
