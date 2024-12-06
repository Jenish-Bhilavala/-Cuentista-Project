const express = require('express');
const router = express.Router();
const upload = require('../../utils/multer');
const { globalRoute } = require('../../utils/globalRoute');
const imageController = require('../../controllers/imageController');

router.post('/', upload.single('image'), imageController.uploadFile);
router.all('*', globalRoute);

module.exports = router;
