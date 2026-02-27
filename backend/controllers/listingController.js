const db = require('../db');

exports.getAllListings = (req, res) => {
  const categoryId = req.query.category;
  let sql = `SELECT listings.*, users.name as user_name, users.location,
             categories.name as category
             FROM listings
             JOIN users ON listings.user_id = users.id
             LEFT JOIN categories ON listings.category_id = categories.id`;
  const params = [];
  if (categoryId) {
    sql += ' WHERE listings.category_id = ?';
    params.push(categoryId);
  }
  sql += ' ORDER BY listings.created_at DESC';
  db.query(sql, params, (err, listings) => {
    if (err) throw err;
    db.query('SELECT * FROM categories', (err2, categories) => {
      if (err2) throw err2;
      res.render('pages/listings', { listings, categories, selectedCategory: categoryId });
    });
  });
};

exports.getListingDetail = (req, res) => {
  const sql = `SELECT listings.*, users.name as user_name, users.location,
               users.email as user_email, categories.name as category
               FROM listings
               JOIN users ON listings.user_id = users.id
               LEFT JOIN categories ON listings.category_id = categories.id
               WHERE listings.id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    if (!result[0]) return res.send('Listing not found');
    res.render('pages/detail', { listing: result[0] });
  });
};

exports.getNewListing = (req, res) => {
  db.query('SELECT * FROM categories', (err, categories) => {
    if (err) throw err;
    res.render('pages/new-listing', { categories });
  });
};

exports.createListing = (req, res) => {
  const { title, description, quantity, expiry_date, category_id } = req.body;
  const sql = 'INSERT INTO listings (user_id, title, description, quantity, expiry_date, category_id) VALUES (?,?,?,?,?,?)';
  db.query(sql, [1, title, description, quantity, expiry_date, category_id], (err) => {
    if (err) throw err;
    res.redirect('/listings');
  });
};