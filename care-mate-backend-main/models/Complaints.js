const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  adminResponse: {
    type: String,
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Opened', 'Resolved'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  severity: {
    type: Number,
    required: true
  }
});

const Complaints = mongoose.model('complaintSchema', complaintSchema);

module.exports = Complaints;
