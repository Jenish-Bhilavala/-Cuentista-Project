const express = require('express');
const router = express.Router();
const { globalRoute } = require('../../utils/globalRoute');

router.get('/create-inquiry', (req, res) => {
  res.send('Hello');
});
router.all('*', globalRoute);

module.exports = router;
