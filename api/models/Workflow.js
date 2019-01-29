const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const WorkflowSchema = new Schema({
  name: String,
  event: {
    type: ObjectId,
    ref: 'Option'
  },
  children: [{
    type: ObjectId,
    ref: 'Option',
    required: function() {
      return this.event;
    }
  }]
});

module.exports = mongoose.model('Workflow', WorkflowSchema);
