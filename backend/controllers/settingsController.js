const User = require('../models/userModel');
const db = require('../db');
const bcrypt = require('bcrypt');

exports.getSettings = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  try {
    const userProfile = await User.getById(req.session.user.id);
    res.render('settings', { title: 'Account Settings', userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.updateProfile = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  try {
    const { name, location } = req.body;
    let profilePicUrl = req.body.existing_pic;
    
    if (req.file) {
      profilePicUrl = '/uploads/' + req.file.filename;
    }
    
    await db.query('UPDATE users SET name = ?, location = ?, profile_pic = ? WHERE id = ?', [name, location, profilePicUrl, req.session.user.id]);
    
    // Update session data natively
    req.session.user.name = name;
    
    res.redirect('/settings?success=1');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.changePassword = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  try {
    const { current_password, new_password, confirm_password } = req.body;
    if (new_password !== confirm_password) return res.redirect('/settings?error=mismatch');
    
    const user = await User.getById(req.session.user.id);
    const match = await bcrypt.compare(current_password, user.password);
    if (!match) return res.redirect('/settings?error=wrongpass');
    
    const hashed = await bcrypt.hash(new_password, 10);
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, req.session.user.id]);
    res.redirect('/settings?success=password');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.deleteAccount = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  try {
    // Physical hard delete cascading all relationships successfully.
    await db.query('DELETE FROM users WHERE id = ?', [req.session.user.id]);
    req.session.destroy();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
