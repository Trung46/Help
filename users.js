const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  database: 'vollies'
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    throw err;
  }
  console.log('MySQL connected...');
});

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = `SELECT user_name, full_name, phone_number, email, password FROM users WHERE userid = ?`; // Correct column name
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(result[0]);
  });
});

router.post('/update', (req, res) => {
  const { user_name, full_name, phone_number, email, password } = req.body;
  const sql = `
    UPDATE users
    SET full_name = ?, phone_number = ?, email = ?, password = ?
    WHERE user_name = ?`;
  db.query(sql, [full_name, phone_number, email, password, user_name], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

module.exports = router;
