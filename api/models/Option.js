const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const OptionSchema = new Schema({
  type: {
    type: String,
    enum: [
      "TAG_EVENT",
      "STAGE_EVENT",
      "WEBHOOK_EVENT",
      "EMAIL_ACTION",
      "TAG_ACTION",
      "STAGE_ACTION",
      "DISQUALIFY_ACTION",
      "WAIT_CONDITION",
      "IF_ELSE_CONDITION"
    ],
  },
  children: [{
    type: ObjectId,
    ref: 'Option'
  }]
});

module.exports = mongoose.model('Option', OptionSchema);
