const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  database: 'vollies2'
});
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
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
