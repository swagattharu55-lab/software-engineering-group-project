const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.getByEmail(email);
    if (!user) {
      return res.render('login', { title: 'Login', error: 'Invalid email or password' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render('login', { title: 'Login', error: 'Invalid email or password' });
    }
    const abGroup = Math.random() > 0.5 ? 'A' : 'B';
    req.session.user = { id: user.id, name: user.name, email: user.email, role: user.role, abGroup };
    if (user.role === 'admin') {
      return res.redirect('/admin');
    }
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getRegister = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.postRegister = async (req, res) => {
  const { name, email, password, location } = req.body;
  try {
    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      return res.render('register', { title: 'Register', error: 'Email already exists! Please login instead.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.create(name, email, hashedPassword, location);
    
    // Auto-login after registration
    req.session.user = { id: userId, name, email, role: 'user' };
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
