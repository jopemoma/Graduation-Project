const mongoose = require('mongoose');
require('dotenv').config();

const userName = process.env.USERNAME;
const password = process.env.PASSWORD;
console.log(userName, password);


mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.1oydg.mongodb.net/BidraSammen?retryWrites=true&w=majority`, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connecteed!');
});

const userSchema = new mongoose.Schema({
  name: String
});

const eventSchema = new mongoose.Schema({
  title: String, 
  organization: String,
  location: String, 
  date: String,
  time: String,
  description: String,
  slotsRemaining: Number 
})

const EventList = mongoose.model('Events', eventSchema);


const garbagePicking = new EventList({
  title: 'Garbage Picking',
  organization: 'Salt',
  location: 'Slottsparken',
  date: '23/07/2020',
  time: '17:00',
  description: 'Pick up trash, clean the park',
  slotsRemaining: 7
});

garbagePicking.save(function (err) {
  if (err) return console.error(err);
});


