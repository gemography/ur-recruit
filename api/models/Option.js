const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const OptionSchema = new Schema({
  type: {
    type: String,
    enum: [
      "EVENT",
      "ACTION",
      "CONDITION"
    ],
  },
  method: {
    type: String,
    enum: [
      "TAG",
      "STAGE",
      "WEBHOOK",
      "EMAIL",
      "DISQUALIFY",
      "WAIT",
      "IF_ELSE"
    ],
  },
  children: [{
    type: ObjectId,
    ref: 'Option'
  }],
  value: String
});

module.exports = mongoose.model('Option', OptionSchema);
