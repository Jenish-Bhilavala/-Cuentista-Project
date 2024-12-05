const express = require('express');
const router = express.Router();

const inquiryRoute = require('../routes/routers/inquiryRoute');

router.use('/api/inquiry', inquiryRoute);

module.exports = router;
