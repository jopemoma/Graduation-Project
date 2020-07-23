const mongoose = require('mongoose');

const orgsSchema = new mongoose.Schema({
  name: String,
  organizationId: String,
  picture: String,
});

const Orgs = mongoose.model('organizations', orgsSchema);

module.exports.Orgs = Orgs;
