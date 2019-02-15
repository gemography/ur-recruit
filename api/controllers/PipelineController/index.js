const Pipeline = require('../../models/Pipeline');

const index = (req, res) => {
  const { id } = req.params;

  Pipeline.
    findById(id).
    populate({
      path: "stages",
      populate: {
        path: "candidates",
        model: "Candidate"
      }
    }).
    populate("workflows").
    exec(function (err, pipeline) {
      if (err) return handleError(err);
      res.status(200).json({ pipeline: pipeline });
    });
};

module.exports = {
  index,
};
