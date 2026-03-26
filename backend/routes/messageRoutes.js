const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/create', messageController.sendMessage);

module.exports = router;
