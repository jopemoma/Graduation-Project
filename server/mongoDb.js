const mongoose = require('mongoose');
const { User } = require('./schema/userSchema');
const { EventList } = require('./schema/eventSchema');
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

async function isUser(facebookId) {
  const res = await User.exists({ facebookId });
  console.log(res);
}

async function fetchEvents() {
  const res = await EventList.find({});
  return res;
}

module.exports.connect = connect;
module.exports.createUser = createUser;
module.exports.isUser = isUser;
module.exports.fetchEvents = fetchEvents;
