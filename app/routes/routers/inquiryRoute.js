const express = require('express');
const router = express.Router();
const { globalRoute } = require('../../utils/globalRoute');
const inquiryController = require('../../controllers/inquiryController');

router.post('/create-inquiry', inquiryController.createInquiry);
router.post('/list-of-inquiry', inquiryController.listOfInquiry);
router.put('/update-inquiry/:id', inquiryController.updateInquiry);
router.all('*', globalRoute);

module.exports = router;
