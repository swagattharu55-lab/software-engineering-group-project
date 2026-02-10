const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    // const users = await User.getAll(); // Uncomment when table exists
    res.json({ message: 'Get all users route working', users: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    // const userId = await User.create(name, email); // Uncomment when table exists
    res.status(201).json({ message: 'User created', userId: 1 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
