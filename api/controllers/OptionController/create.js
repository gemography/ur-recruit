const Option = require('../../models/Option');

const create = (req, res) => {
  const newOption = new Option({ ...req.body });

  newOption
    .save()
    .then((savedOption) => {
      res.status(201).json({ savedOption, msg: 'Successfully created' });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, msg: 'There was an error saving the option in the database.' });
    });
};

module.exports = { create };
