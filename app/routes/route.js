const express = require('express');
const router = express.Router();

const inquiryRoute = require('../routes/routers/inquiryRoute');
const adminRoute = require('../routes/routers/adminRoute');
const imageRoute = require('../routes/routers/imageRoute');

router.use('/api/inquiry', inquiryRoute);
router.use('/api/admin', adminRoute);
router.use('/api/image-upload', imageRoute);

module.exports = router;
