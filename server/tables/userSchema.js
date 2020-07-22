const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  facebookId: String,
});
const User = mongoose.model('UserProfiles', userSchema);

module.exports.User = User;
