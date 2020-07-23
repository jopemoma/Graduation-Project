const mongoose = require('mongoose');

const credSchema = new mongoose.Schema({
  organizationId: String,
  username: String,
  password: String,
});

const Cred = mongoose.model('credentials', credSchema);

module.exports.Cred = Cred;
