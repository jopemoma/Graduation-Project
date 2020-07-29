const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  facebookId: String,
  email: String,
  picture: Object,
});
const User = mongoose.model('UserProfiles', userSchema);

module.exports.User = User;
