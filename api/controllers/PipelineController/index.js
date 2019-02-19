const { create } = require('./create');
const { update } = require('./update');
const { remove } = require('./remove');

const Pipeline = require('../../models/Pipeline');

const index = (req, res) => {
  Pipeline.
    find().
    populate({
      path: "stages",
      populate: {
        path: "candidates",
        model: "Candidate"
      }
    }).
    populate("workflows").
    exec(function (err, pipelines) {
      if (err) return handleError(err);
      res.status(200).json({ pipelines });
    });
};

module.exports = {
  index,
  create,
  update,
  remove
};
