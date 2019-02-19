const Pipeline = require('../../models/Pipeline');

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body

  try {
    pipeline = await Pipeline.findByIdAndUpdate(
      id, { name }
    )
    res.status(200).json({ pipeline, msg: 'Successfully updated' });
  } catch(err) {
    res
      .status(500)
      .json({ err, msg: 'There was an error updating the pipeline in the database.' });
  }
};

module.exports = { update };
