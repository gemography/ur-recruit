const Option = require('../../models/Option');
const Workflow = require('../../models/Workflow');

const create = async (req, res) => {
  const { type, method, parent } = req.body;

  const option = new Option({ type, method });
  const newOption = await option.save();

  (type === "EVENT")?
    await Workflow.updateOne({ _id: "5c505a1766a577184fb85e72" }, {
      $set: { event: newOption._id }
    }):
    await Option.updateOne({ _id: parent }, {
      $push: { children: option._id }
    })

  res.status(201).json({ option: newOption, msg: 'Successfully created' });
};

module.exports = { create };
