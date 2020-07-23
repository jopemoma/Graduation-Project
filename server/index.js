const express = require('express');
const db = require('./mongoDb');

const app = express();

db.connect();

app.use(express.json());

const port = 3000;

app.get('/events', async (req, res) => {
  res.json(await db.fetchEvents());
});

/* ------------------------------- ORGS ------------------------------- */

app.get('/orgs', async (req, res) => {
  res.json(await db.fetchOrgs());
});

app.get('/orgs/:id', async (req, res) => {
  const organization = (await db.fetchOrg(req.params.id))[0];
  return organization ? res.json(organization) : res.status(404).end();
});

/* ------------------------------- USERS ------------------------------- */

app.post('/users', async (req, res) => {
  const { facebookId, name } = req.body;
  if (db.isUser(facebookId)) {
    return res.sendStatus(200);
  }
  db.createUser(facebookId, name);
  return res.sendStatus(201);
});

/* ------------------------------- AUTHENTICATE ------------------------------- */

app.post('/authenticate', async (req, res) => {
  console.log('This is reqbody', req.body);
  const credentials = (await db.authenticate(req.body))[0];
  return credentials ? res.json({ result: true, organizationId: credentials.organizationId }) : res.json({ result: false, organizationId: '' });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
