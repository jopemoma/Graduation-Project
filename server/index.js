const express = require('express');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());

const port = 3000;
const userName = process.env.USERNAME;
const password = process.env.PASSWORD;

mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.1oydg.mongodb.net/BidraSammen?retryWrites=true&w=majority`, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected!');
});

const userSchema = new mongoose.Schema({
  name: String,
  facebookId: String,
});
const User = mongoose.model('UserProfiles', userSchema);

function createUser(id, name) {
  const newUser = new User({ facebookId: id, name });
  newUser.save((err) => {
    if (err) return false;
    return true;
  });
}

app.get('/events', (req, res) => {
  res.send('HELLO');
});

app.post('/users', (req, res) => {
  const { facebookId, name } = req.body;
  User.findOne({ facebookId }, (err, user) => {
    if (err) return res.sendStatus(500);
    if (!user) {
      createUser(facebookId, name);
      return res.sendStatus(201);
    }
    return res.sendStatus(200);
  });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
