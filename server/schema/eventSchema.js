const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  organizationId: String,
  location: String,
  date: String,
  time: String,
  img: String,
  description: String,
  slotsRemaining: Number,
  volunteers: Array,
  pending: Array,
});

const Event = mongoose.model('Events', eventSchema);

module.exports.Event = Event;
