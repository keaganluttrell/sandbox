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
  db.findUser(username, password)
    .then(packet => res.send(packet))
    .catch(e => res.send(e));
});

app.post('/api/signup', async (req, res) => {
  const packet = await db.addUser(req.body);
  console.log(packet.ops[0])
  res.send(packet.ops[0]);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('listening', PORT));