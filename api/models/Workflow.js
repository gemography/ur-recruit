const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const WorkflowSchema = new Schema({
  name: String,
  children: [{
    type: ObjectId,
    ref: 'OptionSchema'
  }]
});

module.exports = mongoose.model('Workflow', WorkflowSchema);
