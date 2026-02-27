const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, users) => {
    if (err) throw err;
    res.render('pages/users', { users });
  });
});

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
    if (err) throw err;
    db.query('SELECT * FROM listings WHERE user_id = ?', [req.params.id], (err2, listings) => {
      if (err2) throw err2;
      res.render('pages/profile', { user: result[0], listings });
    });
  });
});

module.exports = router;