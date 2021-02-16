require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('../database/db.js');

const STATIC = path.resolve('public');

const app = express();
app.use(morgan('tiny'));
app.use(express.static(STATIC));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/login', (req, res) => {
  const { username, password } = req.headers;
  db.verifyUser(username, password)
    .then(packet => res.send(packet[0]))
    .catch(e => res.send(e));
});

app.post('/api/signup', (req, res) => {
  db.addUser(req.body)
    .then(packet => db.getUser(packet.insertId))
    .then(row => res.send(row[0]))
    .catch(e => res.send(e));
});

app.get('/api/featured', (req, res) => {
  db.getFeatured()
    .then(packet => res.send(packet))
    .catch(e => res.send(e));
});

app.get('/api/box/', (req, res) => {
  const { boxid, userid } = req.query;
  if (boxid) {
    db.getBox(boxid)
      .then(packet => res.send(packet[0]))
  } else if (userid) {
    console.log(userid)
    db.getAllUserBoxes(userid)
      .then(packet => res.send(packet))
      .catch(e => res.send(e));
  } else {
    res.send(404);
  }
});

app.post('/api/box', (req, res) => {
  db.addBox(req.body)
    .then(packet => res.send(String(packet.insertId)))
    .catch(e => res.send(e));
});

app.put('/api/box/:boxid', (req, res) => {
  const { boxid } = req.params;
  db.updateBox(req.body, boxid)
    .then(packet => res.send(packet))
    .catch(e => res.send(e));
});

app.patch('/api/views/:boxid', (req, res) => {
  const { boxid } = req.params;
  db.updateBoxFieldByOne('views', boxid)
    .then((x) => {
      console.log(x);
      res.send('ok')
    })
    .catch(e => res.send(e));
});

app.patch('/api/likes/:boxid', (req, res) => {
  const { boxid } = req.params;
  db.updateBoxFieldByOne('likes', boxid)
    .then(() => res.send('ok'))
    .catch(e => res.send(e));
});

app.delete('/api/box/:boxid', (req, res) => {
  const { boxid } = req.params;
  console.log('delete')
  db.removeOneBox(boxid)
    .then(() => res.send('ok'))
    .catch(e => res.send(e));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('listening', PORT));