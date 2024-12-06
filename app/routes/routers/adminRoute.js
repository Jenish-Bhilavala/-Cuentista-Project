const express = require('express');
const router = express.Router();
const { globalRoute } = require('../../utils/globalRoute');
const adminController = require('../../controllers/adminController');

router.post('/login', adminController.adminLogin);
router.all('*', globalRoute);

module.exports = router;
