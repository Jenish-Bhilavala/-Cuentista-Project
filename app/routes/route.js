const express = require('express');
const router = express.Router();

const inquiryRoute = require('../routes/routers/inquiryRoute');
const adminRoute = require('../routes/routers/adminRoute');

router.use('/api/inquiry', inquiryRoute);
router.use('/api/admin', adminRoute);

module.exports = router;
