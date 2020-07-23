const express = require('express');
const db = require('./mongoDb');

const app = express();

db.connect();

app.use(express.json());

const port = 3000;

app.get('/events', async (req, res) => {
  res.json(await db.fetchEvents());
});

app.get('/orgs', async (req, res) => {
  res.json(await db.fetchOrgs());
});

app.get('/orgs/:id', async (req, res) => {
  const organization = (await db.fetchOrg(req.params.id))[0];
  return organization ? res.json(organization) : res.status(404).end();
});

app.post('/users', async (req, res) => {
  const { facebookId, name } = req.body;
  if (db.isUser(facebookId)) {
    return res.sendStatus(200);
  }
  db.createUser(facebookId, name);
  return res.sendStatus(201);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
