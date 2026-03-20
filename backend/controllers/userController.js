const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const db = require('../services/db');

exports.getAllUsers = async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM users ORDER BY created_at DESC', []);
    res.render('pages/users', { users: results });
  } catch (err) {
    console.error(err);
    res.send('Error loading users');
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = new User(req.params.id);
    await user.getUserDetails();
    await user.getUserListings();
    res.render('pages/profile', { user, listings: user.listings });
  } catch (err) {
    console.error(err);
    res.send('Error loading profile');
  }
};

exports.addUserNote = async (req, res) => {
  try {
    const { id, note } = req.body;
    const user = new User(id);
    await user.addUserNote(note);
    res.redirect('/users/' + id);
  } catch (err) {
    console.error(err);
    res.send('Error adding note');
  }
};

exports.getNewUserForm = (req, res) => {
  res.render('pages/new-user');
};

exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, dob, mobile } = req.body;
    const name = first_name + ' ' + last_name;

    let passwordHash = 'defaultpass';
    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    const insertId = await User.createUser(
      name,
      email,
      passwordHash,
      dob ? dob : null,
      mobile ? mobile : null
    );
    res.redirect('/users/' + insertId);
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      res.send('Error: This email address is already registered. Please use another.');
    } else {
      res.send('Error creating user');
    }
  }
};