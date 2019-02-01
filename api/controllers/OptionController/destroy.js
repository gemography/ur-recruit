const Option = require('../../models/Option');
const Workflow = require('../../models/Workflow');

const destroy = async (req, res) => {
  const { id } = req.params;

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
    await Workflow.updateOne({ _id: "5c505a1766a577184fb85e72" }, {
      $set: { event: null }
    })
  }

  option = await Option.deleteOne({ _id: option.id })
  res.status(204).json({});
};

module.exports = { destroy };
