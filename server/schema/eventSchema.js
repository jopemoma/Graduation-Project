const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  organization: String,
  location: String,
  date: String,
  time: String,
  description: String,
  slotsRemaining: Number,
});

const EventList = mongoose.model('Events', eventSchema);

module.exports.EventList = EventList;
