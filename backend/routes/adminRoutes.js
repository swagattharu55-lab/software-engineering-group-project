const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.getAdminDashboard);
router.post('/listings/:id/delete', adminController.deleteListingAdmin);

module.exports = router;
