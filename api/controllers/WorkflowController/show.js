const Workflow = require('../../models/Workflow');

const show = (req, res) => {
  const { id } = req.params;
  Workflow.findById(id).
  populate('children').
  exec(function (err, workflow) {
    if (err) return handleError(err);
    res.status(200).json({ workflow });
  });
};

module.exports = { show };
