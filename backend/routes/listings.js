const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const sql = `SELECT listings.*, users.name as user_name, users.location 
               FROM listings JOIN users ON listings.user_id = users.id`;
  db.query(sql, (err, listings) => {
    if (err) throw err;
    res.render('pages/listings', { listings });
  });
});

router.get('/new', (req, res) => {
  res.render('pages/new-listing');
});

router.post('/', (req, res) => {
  const { title, description, quantity, expiry_date, category_id } = req.body;
  const sql = 'INSERT INTO listings (user_id, title, description, quantity, expiry_date) VALUES (?,?,?,?,?)';
  db.query(sql, [1, title, description, quantity, expiry_date], (err, result) => {
    if (err) throw err;
    res.redirect('/listings');
  });
});

router.get('/:id', (req, res) => {
  const sql = `SELECT listings.*, users.name as user_name, users.location, categories.name as category
               FROM listings 
               JOIN users ON listings.user_id = users.id
               LEFT JOIN listing_categories ON listings.id = listing_categories.listing_id
               LEFT JOIN categories ON listing_categories.category_id = categories.id
               WHERE listings.id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.render('pages/detail', { listing: result[0] });
  });
});

module.exports = router;