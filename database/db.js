require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const url = `${process.env.URL}/${process.env.DATABASE}`;

var db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    db = client.db(process.env.DATABASE);
    console.log('Mongo Client is Live');
  })
  .catch(e => console.log(e));

function addUser(user) {
  return db.collection('users').insertOne(user);
}

function findUser(username, password) {
  return db.collection('users').findOne({ username, password })
};

module.exports = {
  addUser,
  findUser,
}