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
  rejected: Array,
});

const Event = mongoose.model('Events', eventSchema);
const EventDeleted = mongoose.model('deletedevents', eventSchema);

module.exports.Event = Event;
module.exports.EventDeleted = EventDeleted;
