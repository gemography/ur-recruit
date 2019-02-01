const Option = require('../../models/Option');
const mongoose = require('mongoose');

const destroy = async (req, res) => {
  const { id } = req.params;

  option = await Option.findById(id);
  parent = await Option.findOne({ children: option._id});

  await Option.updateOne({ _id: parent.id }, {
    $pull: { children: option._id }
  })

  await Option.updateOne({ _id: parent.id }, {
    $push: { children: { $each: option.children }}
  })

  option = await Option.deleteOne({ _id: option.id })

  res.status(204).json({});
};

module.exports = { destroy };
