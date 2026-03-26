const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.post('/create', requestController.createRequest);
router.post('/:id/:action', requestController.updateRequestStatus);

module.exports = router;
