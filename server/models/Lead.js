const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  businessName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  services: {
    type: String,
    trim: true
  },
  goal: {
    type: String,
    trim: true
  },
  budget: {
    type: String,
    enum: ['$1k - $2.5k', '$2.5k - $5k', '$5k - $10k', '$10k+', ''],
    default: ''
  },
  revenue: {
    type: String,
    enum: ['$0 - $10k', '$10k - $30k', '$30k - $70k', '$70k+', ''],
    default: ''
  },
  source: {
    type: String,
    enum: ['contact-form', 'chatbot', 'demo-request', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'],
    default: 'new'
  },
  notes: [{
    text: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  followUpDate: {
    type: Date
  },
  scheduleCall: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for searching
leadSchema.index({ email: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Lead', leadSchema);
