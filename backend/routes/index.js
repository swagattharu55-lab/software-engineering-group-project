const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT COUNT(*) as count FROM users', (err, userCount) => {
    db.query('SELECT COUNT(*) as count FROM listings', (err2, listingCount) => {
      db.query('SELECT * FROM categories', (err3, categories) => {
        res.render('pages/index', {
          userCount: userCount ? userCount[0].count : 0,
          listingCount: listingCount ? listingCount[0].count : 0,
          categories: categories || []
        });
      });
    });
  });
});

module.exports = router;