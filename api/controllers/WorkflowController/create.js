const Workflow = require('../../models/Workflow');

const create = (req, res) => {
  const newWorkflow = new Workflow({ ...req.body });

  newWorkflow
    .save()
    .then((savedWorkflow) => {
      res.status(201).json({ savedWorkflow, msg: 'Successfully created' });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, msg: 'There was an error saving the workflow in the database.' });
    });
};

module.exports = { create };
