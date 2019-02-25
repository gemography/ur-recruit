const Option = require('../../../models/Option');
const Workflow = require('../../../models/Workflow');
const uuid = require('uuid/v1');

const createWebhook = async (req, res) => {
  const { type, method } = req.body;
  const { workflow_id } = req.params;

  try {
    const option = new Option({ type, method, value: uuid() });
    const newOption = await option.save();
    await Workflow.updateOne({ _id: workflow_id }, {
      $set: { event: newOption._id }
    })

    res.status(201).json({ msg: 'Successfully Created' });
  }catch (e){
    res.status(400).json({ error: e });
  }
};

module.exports = { createWebhook };
