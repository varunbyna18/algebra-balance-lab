const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  equationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equation',
    required: true
  },
  userAnswer: {
    type: Number,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  timeSpent: {
    type: Number, // in seconds
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  attemptsCount: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Attempt', attemptSchema);
