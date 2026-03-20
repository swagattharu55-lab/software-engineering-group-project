const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');

router.get('/', listingController.getAllListings);
router.get('/new', listingController.getNewListing);
router.post('/', listingController.createListing);
router.post('/update-category', listingController.updateCategory);
router.get('/:id', listingController.getListingDetail);

module.exports = router;