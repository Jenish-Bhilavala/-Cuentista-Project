const express = require('express');
const router = express.Router();
const { globalRoute } = require('../../utils/globalRoute');
const adminController = require('../../controllers/adminController');

router.post('/login', adminController.adminLogin);
router.post('/verify-email', adminController.verifyEmail);
router.put('/change-password', adminController.changePassword);
router.put('/forgot-password', adminController.forgotPassword);
router.all('*', globalRoute);

module.exports = router;
