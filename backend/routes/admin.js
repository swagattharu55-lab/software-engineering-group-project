const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

function adminAuth(req, res, next) {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    if (login === 'swagattharu55@gmail.com' && password === '1234') {
        return next();
    }
    res.set('WWW-Authenticate', 'Basic realm="Admin Panel"');
    res.status(401).send('Admin Login Required: Invalid credentials.');
}

router.use(adminAuth);

router.get('/', adminController.getDashboard);
router.post('/delete-user', adminController.deleteUser);
router.post('/delete-listing', adminController.deleteListing);

module.exports = router;
