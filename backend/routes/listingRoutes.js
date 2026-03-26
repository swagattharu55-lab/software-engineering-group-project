const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const upload = require('../middleware/upload');

router.get('/', listingController.getAllListings);
router.post('/create', upload.single('image'), listingController.createListing);
router.post('/:id/delete', listingController.deleteListing);
router.get('/:id', listingController.getListingById);

module.exports = router;
