const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  id: String,
  title: String,
  organizationId: String,
  location: String,
  date: String,
  time: String,
  description: String,
  slotsRemaining: Number,
  volunteers: Array,
});

const Event = mongoose.model('Events', eventSchema);

module.exports.Event = Event;
