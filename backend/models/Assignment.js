const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  engineerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Engineer',
    required: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  hours: {
    type: Number,
    required: true,
    min: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Assignment', assignmentSchema);