const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) { cb(null, 'public/uploads/'); },
  filename: function(req, file, cb) { cb(null, Date.now() + path.extname(file.originalname)); }
});
const upload = multer({ storage: storage });

router.get('/', settingsController.getSettings);
router.post('/update', upload.single('profile_pic'), settingsController.updateProfile);
router.post('/password', settingsController.changePassword);
router.post('/delete', settingsController.deleteAccount);

module.exports = router;
