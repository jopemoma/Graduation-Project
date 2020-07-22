const mongoose = require('mongoose');
const { User } = require('./tables/userSchema');
require('dotenv').config();

const userName = process.env.USERNAME;
const password = process.env.PASSWORD;

function connectToDatabase() {
  mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.1oydg.mongodb.net/BidraSammen?retryWrites=true&w=majority`, { useNewUrlParser: true });
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
connectToDatabase();
console.log(createUser('34242', 'Martin'));
