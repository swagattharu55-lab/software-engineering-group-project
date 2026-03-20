const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.getDashboard);
router.post('/delete-user', adminController.deleteUser);
router.post('/delete-listing', adminController.deleteListing);

module.exports = router;
