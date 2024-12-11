const express = require('express');
const router = express.Router();
const { globalRoute } = require('../../utils/globalRoute');
const serviceController = require('../../controllers/serviceController');

router.post('/', serviceController.addService);
router.get('/get-service-list', serviceController.getServiceList);
router.get('/view-service/:id', serviceController.viewService);
router.post('/list-of-service', serviceController.listOfService);
router.put('/update-service/:id', serviceController.updateService);
router.delete('/delete-service/:id', serviceController.deleteService);
router.all('*', globalRoute);

module.exports = router;
