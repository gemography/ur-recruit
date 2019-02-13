const Option = require('../../models/Option');

const update = async (req, res) => {
  const { value } = req.body;
  const { id } = req.params;

  try {
    await Option.findByIdAndUpdate(
      id, { $set: { value }}
    )
    res.status(200).json({ msg: 'Successfully Updated' });
  }catch (e){
    res.status(400).json({ error: e });
  }
};

module.exports = { update };
