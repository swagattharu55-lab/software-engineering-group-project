const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/new', userController.getNewUserForm);
router.post('/new', userController.createUser);
router.get('/:id', userController.getUserProfile);
router.post('/add-note', userController.addUserNote);

module.exports = router;