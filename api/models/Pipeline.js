const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const PipelineSchema = new Schema({
  name: String,
  stages: [{
    type: ObjectId,
    ref: 'Stage'
  }],
  workflows: [{
    type: ObjectId,
    ref: 'Workflow'
  }],
});

module.exports = mongoose.model('Pipeline', PipelineSchema);
