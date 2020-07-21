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
  console.log('Connecteed!');
});

const userSchema = new mongoose.Schema({
  name: String,
  facebookId: String,
});
const User = mongoose.model('UserProfiles', userSchema);

function isExistingUser(id) {
  let isUser = true;
  User.findOne({ facebookId: id }, 'name', (err) => {
    if (err) isUser = false;
  }).then(() => isUser);
}

function createUser(id, name) {
  const newUser = new User({ facebookId: id, name });
  newUser.save((err) => {
    if (err) return false;
    return true;
  });
}

app.post('/users', (req, res) => {
  const { facebookId, name } = req.body;
  console.log(facebookId, name);
  console.log(isExistingUser(facebookId));
  if (!isExistingUser(facebookId)) {
    if (!createUser(facebookId, name)) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  } else {
    res.sendStatus(200);
  }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
