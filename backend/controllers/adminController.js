const db = require('../db');

exports.getAdminDashboard = async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).render('404', { message: 'Access Denied: Admins Only' });
  }
  try {
    const [users] = await db.query('SELECT * FROM users ORDER BY created_at DESC');
    const [listings] = await db.query('SELECT * FROM listings ORDER BY created_at DESC');
    res.render('admin', { title: 'Admin Dashboard', users, listings });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.deleteListingAdmin = async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') return res.status(403).send('Access Denied');
  try {
    await db.query('DELETE FROM listings WHERE id = ?', [req.params.id]);
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
