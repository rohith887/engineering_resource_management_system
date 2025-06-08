const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Planning', 'Active', 'Completed'],
    default: 'Planning'
  },
  requiredSkills: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);