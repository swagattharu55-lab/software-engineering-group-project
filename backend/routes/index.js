const express = require('express');
const router = express.Router();
const db = require('../services/db');

router.get('/', async (req, res) => {
  try {
    const userCount = await db.query('SELECT COUNT(*) as count FROM users', []);
    const listingCount = await db.query('SELECT COUNT(*) as count FROM listings', []);
    const categories = await db.query('SELECT * FROM categories', []);
    res.render('pages/index', {
      userCount: userCount[0].count,
      listingCount: listingCount[0].count,
      categories
    });
  } catch (err) {
    console.error(err);
    res.render('pages/index', { userCount: 0, listingCount: 0, categories: [] });
  }
});

module.exports = router;