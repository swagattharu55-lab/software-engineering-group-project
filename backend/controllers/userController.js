const db = require('../db');

exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users ORDER BY created_at DESC', (err, users) => {
    if (err) throw err;
    res.render('pages/users', { users });
  });
};

exports.getUserProfile = (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) throw err;
    if (!result[0]) return res.send('User not found');
    const user = result[0];
    const sql = `SELECT listings.*, categories.name as category
                 FROM listings
                 LEFT JOIN categories ON listings.category_id = categories.id
                 WHERE listings.user_id = ?
                 ORDER BY listings.created_at DESC`;
    db.query(sql, [userId], (err2, listings) => {
      if (err2) throw err2;
      res.render('pages/profile', { user, listings });
    });
  });
};