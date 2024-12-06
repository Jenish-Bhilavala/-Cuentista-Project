const express = require('express');
const router = express.Router();

const inquiryRoute = require('../routes/routers/inquiryRoute');
const adminRoute = require('../routes/routers/adminRoute');
const imageRoute = require('../routes/routers/imageRoute');
const productRoute = require('../routes/routers/productRoute');

router.use('/api/inquiry', inquiryRoute);
router.use('/api/admin', adminRoute);
router.use('/api/image-upload', imageRoute);
// router.use('/api/product', productRoute);

module.exports = router;
