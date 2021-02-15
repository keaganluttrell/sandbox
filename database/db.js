const mysql = require('mysql');
const Promise = require('bluebird');
Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sandbox'
})

db.connectAsync()
  .then(() => {
    console.log(`MySql connected to '${db.config.database}'`);
  })
  .catch((err) => console.log(err));


const getBox = (boxid) => {
  return db.queryAsync('select * from boxes where boxid = ?', [boxid]);
};

const addBox = (box) => {
  return db.queryAsync('insert into boxes set ?', box);
}

const updateBox = (box, boxid) => {
  const query = 'update boxes set html = ?, css = ?, js = ?, name = ? where boxid = ?';
  const { html, css, js, name } = box;
  return db.queryAsync(query, [html, css, js, name, boxid]);
}

const getFeatured = () => {
  return db.queryAsync('select * from boxes limit 6');
};

const getAllUserBoxes = (userid) => {
  const query = 'select * from boxes where userid = ?'
  return db.queryAsync(query, [userid]);
};

const verifyUser = (username, password) => {
  const query = 'SELECT * FROM users WHERE username = ? and password = ?'
  return db.queryAsync(query, [username, password]);
};

const addUser = (user) => {
  return db.queryAsync('INSERT INTO users SET ?', user);
};

const getUser = (userid) => {
  return db.queryAsync('SELECT * FROM users WHERE userid = ?', [userid]);
};

const removeOne = (id) => {
  return db.queryAsync('DELETE FROM movie_list WHERE id = ?', [id]);
};

module.exports = {
  getBox,
  addBox,
  updateBox,
  getAllUserBoxes,
  getUser,
  verifyUser,
  addUser,
  removeOne,
  getFeatured,
};