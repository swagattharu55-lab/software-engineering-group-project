const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.get('/new/:requestId', ratingController.getRatingForm);
router.post('/', ratingController.submitRating);

module.exports = router;
