const Pipeline = require('../../models/Pipeline');

const create = (req, res) => {
  const { name } = req.body
  const newPipeline = new Pipeline({ name });

  newPipeline
    .save()
    .then((pipeline) => {
      res.status(201).json({ pipeline, msg: 'Successfully created' });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, msg: 'There was an error saving the workflow in the database.' });
    });
};

module.exports = { create };
