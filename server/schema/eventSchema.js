const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  organizationId: String,
  location: String,
  date: String,
  time: String,
  description: String,
  slotsRemaining: Number,
});

const Event = mongoose.model('Events', eventSchema);

module.exports.Event = Event;
