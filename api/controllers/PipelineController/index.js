const Pipeline = require('../../models/Pipeline');

const index = (req, res) => {
  const { id } = req.params;

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
};
