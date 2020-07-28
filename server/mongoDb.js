/* eslint-disable dot-notation */
const mongoose = require('mongoose');
const { User } = require('./schema/userSchema');
const { Event, EventDeleted } = require('./schema/eventSchema');
const { Orgs } = require('./schema/orgsSchema');
const { Cred } = require('./schema/credSchema');
require('dotenv').config();

const userName = process.env.USERNAME;
const password = process.env.PASSWORD;

function connect() {
  mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.1oydg.mongodb.net/BidraSammen?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected!');
  });
}

function createUser(id, name) {
  const newUser = new User({ facebookId: id, name });
  newUser.save((err) => {
    if (err) return false;
    return true;
  });
}

async function deleteEvent(_id) {
  const event = await Event.findOne({ _id });
  const swap = new EventDeleted(event);
  swap['_id'] = mongoose.Types.ObjectId();
  swap.isNew = true;
  swap.save();
  event.remove();
}

async function fetchUser(facebookId) {
  const res = await User.findOne({ facebookId });
  return res;
}

async function isUser(facebookId) {
  const res = await User.exists({ facebookId });
  return res;
}

async function fetchEvents(filter = {}) {
  const res = await Event.find(filter);
  return res;
}

async function acceptVolunteer(eventId, body) {
  switch (body.action) {
    case 'accept': {
      const res = await Event.findOneAndUpdate(eventId, {
        $pull: { pending: body.facebookId },
        $push: { volunteers: body.facebookId },
        $inc: { slotsRemaining: -1 },
      }, { new: true });
      return res;
    }
    case 'reject': {
      const res = await Event.findOneAndUpdate(eventId, {
        $pull: { pending: body.facebookId },
      }, { new: true });
      return res;
    }
    default:
      console.log('Oops. Default case in acceptVolunteer.');
      return null;
  }
}

async function fetchOrgs() {
  const res = await Orgs.find();
  return res;
}

async function fetchOrg(organizationId) {
  const res = await Orgs.find({ organizationId });
  return res;
}

async function authenticate(data) {
  const res = await Cred.find(data);
  return res;
}

async function createEvent(eventData) {
  const newEvent = new Event(eventData);
  const res = await newEvent.save();
  return res;
}

async function addPending(eventId, eventData) {
  // eslint-disable-next-line max-len
  const res = await Event.findOneAndUpdate(eventId, { $push: { pending: eventData } }, { new: true });
  return res;
}

module.exports = {
  connect,
  createUser,
  fetchUser,
  isUser,
  fetchEvents,
  fetchOrgs,
  fetchOrg,
  authenticate,
  createEvent,
  addPending,
  acceptVolunteer,
  deleteEvent,
};
