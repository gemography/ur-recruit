
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const WorkflowSchema = new Schema({
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
  parent: [{
    type: ObjectId,
    ref: 'WorkflowSchema'
  }]
});

module.exports = mongoose.model('Workflow', WorkflowSchema);
