const Option = require('../../models/Option');

const create = (req, res) => {
  const { type, parentId } = req.body;

  new Option({ type })
    .save()
    .then(savedOption => {
      Option.update({ _id: parentId }, { $push: { children: savedOption._id }}, () => {
        res.status(201).json({ savedOption, msg: 'Successfully created' });
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, msg: 'There was an error saving the option in the database.' });
    });
};

module.exports = { create };
