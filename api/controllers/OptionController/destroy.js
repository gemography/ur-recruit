const Option = require('../../models/Option');
const Workflow = require('../../models/Workflow');

const destroy = async (req, res) => {
  const { id, workflow_id } = req.params;

  try{
    option = await Option.findById(id);

    if(option.type !== "EVENT") {
      parent = await Option.findOne({ children: option._id});

      await Option.updateOne({ _id: parent.id }, {
        $pull: { children: option._id }
      })

      await Option.updateOne({ _id: parent.id }, {
        $push: { children: { $each: option.children }}
      })
    } else {
      await Workflow.updateOne({ _id: workflow_id }, {
        $set: { event: null }
      })
    }

    option = await Option.deleteOne({ _id: option.id })
    res.status(204).json({});
  }catch (e){
    res.status(400).json({ error: e });
  }
};

module.exports = { destroy };
