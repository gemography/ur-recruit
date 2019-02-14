const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const StageSchema = new Schema({
  name: String,
  candidates: [{
    type: ObjectId,
    ref: 'Candidate'
  }]
});

module.exports = mongoose.model('Stage', StageSchema);
