const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'bot'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  visitorInfo: {
    ip: String,
    userAgent: String,
    country: String,
    city: String
  },
  leadCapture: {
    captured: {
      type: Boolean,
      default: false
    },
    email: String,
    phone: String,
    name: String,
    businessName: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for cleanup queries
chatMessageSchema.index({ updatedAt: 1 });
chatMessageSchema.index({ 'leadCapture.captured': 1 });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
