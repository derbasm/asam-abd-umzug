import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
  },
  location: {
    country: String,
    city: String,
    region: String,
    timezone: String,
  },
  visitedPages: [{
    path: String,
    timestamp: Date,
  }],
  firstVisit: {
    type: Date,
    default: Date.now,
  },
  lastVisit: {
    type: Date,
    default: Date.now,
  },
  visits: {
    type: Number,
    default: 1,
  },
});

export const Visitor = mongoose.models.Visitor || mongoose.model('Visitor', visitorSchema); 