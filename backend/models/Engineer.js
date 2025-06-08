const mongoose = require('mongoose');

const engineerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  skills: {
    type: [String],
    default: []
  },
  capacity: {
    type: Number,
    required: true,
    min: 0
  },
  assignedHours: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Engineer', engineerSchema);