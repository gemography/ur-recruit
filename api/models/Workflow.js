const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const WorkflowSchema = new Schema({
  name: String,
  event: {
    type: ObjectId,
    ref: 'Option'
  }
});

module.exports = mongoose.model('Workflow', WorkflowSchema);
