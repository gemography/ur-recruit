const Workflow = require('../../models/Workflow');
const mongoose = require('mongoose');

const show = (req, res) => {
  const { id } = req.params;
  const { ObjectId } = mongoose.Types;
  Workflow.
  aggregate([
    { $match: { _id: ObjectId(id) } },
    {
      $graphLookup: {
        from: 'options',
        startWith: '$event',
        connectFromField: 'children',
        connectToField: '_id',
        as: 'children',
        maxDepth: 20
      }
    }
  ]).
  exec(function (err, workflows) {
    if (err) return handleError(err);
    res.status(200).json({ workflow: workflows[0] });
  });
};

module.exports = { show };
