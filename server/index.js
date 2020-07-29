/* eslint-disable dot-notation */
const express = require('express');
const db = require('./mongoDb');

const app = express();

db.connect();

app.use(express.json());

const port = 3000;

/* ------------------------------- EVENTS ------------------------------- */

app.get('/events', async (req, res) => {
  res.json(await db.fetchEvents());
});

// TODO: Error testing -- making sure :id is correct and the update was successful.
app.post('/events/:_id', async (req, res) => {
  res.json(await db.addPending(req.params, req.body.userId));
});

app.post('/events', async (req, res) => {
  res.json(await db.createEvent(req.body));
});

app.put('/events/:_id', async (req, res) => {
  res.json(await db.acceptVolunteer(req.params, req.body));
});

app.delete('/events/:_id', async (req, res) => {
  await db.deleteEvent(req.params);
  res.sendStatus(200);
});

/* ------------------------------- ORGS ------------------------------- */

app.get('/orgs', async (req, res) => {
  res.json(await db.fetchOrgs());
});

app.get('/orgs/:id', async (req, res) => {
  const organization = (await db.fetchOrg(req.params.id))[0];
  return organization ? res.json(organization) : res.status(404).end();
});

app.get('/orgs/:organizationId/events', async (req, res) => {
  res.json(await db.fetchEvents(req.params));
});

/* ------------------------------- USERS ------------------------------- */

app.get('/users/:facebookId', async (req, res) => {
  if (db.isUser(req.params.facebookId)) {
    return res.send(await db.fetchUser(req.params.facebookId));
  }
  return res.sendStatus(404);
});

app.post('/users', async (req, res) => {
  if (await db.isUser(req.body.id)) {
    return res.sendStatus(200);
  }
  db.createUser(req.body);
  return res.sendStatus(201);
});

/* ------------------------------- AUTHENTICATE ------------------------------- */

app.post('/authenticate', async (req, res) => {
  const credentials = (await db.authenticate(req.body))[0];
  return credentials ? res.json({ result: true, organizationId: credentials.organizationId }) : res.json({ result: false, organizationId: '' });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
