const db = require('../services/db');

exports.getDashboard = async (req, res) => {
    try {
        const users = await db.query('SELECT * FROM users ORDER BY created_at DESC', []);
        const listings = await db.query(`
      SELECT listings.*, users.name as user_name, categories.name as category 
      FROM listings 
      JOIN users ON listings.user_id = users.id 
      LEFT JOIN categories ON listings.category_id = categories.id
      ORDER BY listings.created_at DESC
    `, []);
        const categories = await db.query('SELECT * FROM categories', []);

        res.render('pages/admin', {
            users,
            listings,
            categories,
            userCount: users.length,
            listingCount: listings.length
        });
    } catch (err) {
        console.error(err);
        res.send('Error loading admin dashboard');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        // Remove dependencies first if any (like listings, requests)
        await db.query('DELETE FROM listings WHERE user_id = ?', [id]);
        await db.query('DELETE FROM users WHERE id = ?', [id]);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.send('Error deleting user');
    }
};

exports.deleteListing = async (req, res) => {
    try {
        const { id } = req.body;
        await db.query('DELETE FROM listings WHERE id = ?', [id]);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.send('Error deleting listing');
    }
};
