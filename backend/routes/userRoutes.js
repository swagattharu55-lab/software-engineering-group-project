const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Standard MVC paths returning HTML pages
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserProfile);

module.exports = router;
//- Route configurations
//- Profiling endpoints
