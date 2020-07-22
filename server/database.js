const mongoose = require('mongoose');

const userName = process.env.USERNAME;
const password = process.env.PASSWORD;

const userSchema = new mongoose.Schema({
  name: String,
  facebookId: String,
});
const User = mongoose.model('UserProfiles', userSchema);

function connectToDatabase() {
  mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.1oydg.mongodb.net/BidraSammen?retryWrites=true&w=majority`, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected!');
  });
}

function createUser(id, name) {
  connectToDatabase();
  const newUser = new User({ facebookId: id, name });
  newUser.save((err) => {
    if (err) return false;
    return true;
  });
}

// async function findUser(facebookId, name) {
//   User.findOne({ facebookId, name }, (err, user) => {
//     if (err) return err; 
//     if (!user) {
//       createUser(facebookId, name);
//       return 
//     }
//   })
// }

User.findOne({ facebookId }, (err, user) => {
  if (err) return res.sendStatus(500);
  if (!user) {
    createUser(facebookId, name);
    return res.sendStatus(201);
  }
  return res.sendStatus(200);
});