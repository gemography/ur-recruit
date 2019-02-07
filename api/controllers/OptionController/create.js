const Option = require('../../models/Option');
const Workflow = require('../../models/Workflow');

const create = async (req, res) => {
  const { type, method, parent } = req.body;
  const { workflow_id } = req.params;

  try {
    const option = new Option({ type, method });
    const newOption = await option.save();

    (type === "EVENT")?
      await Workflow.updateOne({ _id: workflow_id }, {
        $set: { event: newOption._id }
      }):
      await Option.updateOne({ _id: parent }, {
        $push: { children: option._id }
      })

    res.status(201).json({ option: newOption, msg: 'Successfully created' });
  }catch (e){
    res.status(400).json({ error: e });
  }
};

module.exports = { create };
