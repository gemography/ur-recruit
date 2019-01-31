const Option = require('../../models/Option');

const create = (req, res) => {
  const { type, method, parent } = req.body;

  new Option({ type, method })
    .save()
    .then(option => {
      Option.update({ _id: parent }, { $push: { children: option._id }}, () => {
        res.status(201).json({ option, msg: 'Successfully created' });
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, msg: 'There was an error saving the option in the database.' });
    });
};

module.exports = { create };
