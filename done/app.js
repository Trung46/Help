const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  database: 'yourdatabase'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const users = require('./routes/users');
app.use('/users', users);

module.exports = app;  // Export the app
