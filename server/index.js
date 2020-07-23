const express = require('express');
const db = require('./mongoDb');

const app = express();

db.connect();

app.use(express.json());

const port = 3000;

app.get('/events', (req, res) => {
  res.json(db.fetchEvents());
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
