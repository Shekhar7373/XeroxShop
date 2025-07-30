const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  cloudinaryId: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true
  },
  shopId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'ready', 'downloaded'],
    default: 'pending'
  },
  copies: {
    type: Number,
    default: 1,
    min: 1
  },
  instructions: {
    type: String,
    trim: true
  },
  downloadedAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Document', documentSchema);