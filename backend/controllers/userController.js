const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.render('users', { title: 'Community Users', users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      return res.status(404).render('404', { message: 'User not found' });
    }
    res.render('profile', { title: `${user.name}'s Profile`, user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
