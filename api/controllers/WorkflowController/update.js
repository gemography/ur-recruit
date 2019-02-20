const Workflow = require('../../models/Workflow');

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body

  try {
    await Workflow.findByIdAndUpdate(
      id, { $set: { name }}
    );
    const workflow = await Workflow.findById(id)
    res.status(200).json({ workflow, msg: 'Successfully updated' });
  } catch(err) {
    res
      .status(500)
      .json({ err, msg: 'There was an error saving the workflow in the database.' });
  }
};

module.exports = { update };
