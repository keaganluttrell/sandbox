require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const STATIC = path.resolve('public');

const app = express();
app.use(morgan('tiny'));
app.use(express.static(STATIC));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('listening', PORT));