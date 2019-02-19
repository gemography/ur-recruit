const Pipeline = require('../../models/Pipeline');

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await Pipeline.deleteOne({ _id: id })
    res.status(204).json({});
  } catch(err) {
    res
      .status(500)
      .json({ err, msg: 'There was an error deleting pipeline in the database.' });
  }
};

module.exports = { remove };
