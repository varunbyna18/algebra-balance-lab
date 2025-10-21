const mongoose = require('mongoose');

const equationSchema = new mongoose.Schema({
  equation: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  solution: {
    type: Number,
    required: true
  },
  variables: [{
    name: String,
    coefficient: Number
  }],
  constants: [{
    value: Number,
    side: String // 'left' or 'right'
  }],
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Equation', equationSchema);
