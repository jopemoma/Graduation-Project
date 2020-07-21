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

const User = mongoose.model('User', userSchema);

const martin = new User({ name: 'Martin' });

martin.save(function (err) {
  if (err) return console.error(err);
});


