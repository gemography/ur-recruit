const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const CandidateSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    enum: [
      "GOOD",
      "BAD",
      "UGLY"
    ],
  },
  status: {
    type: String,
    enum: [
      "QUALIFIED",
      "DISQUALIFIED"
    ],
  },
  lastMailed: Date,
  step: {
    type: ObjectId,
    ref: 'Option'
  }
});

module.exports = mongoose.model('Candidate', CandidateSchema);
