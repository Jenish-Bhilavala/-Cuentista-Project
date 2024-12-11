const express = require('express');
const router = express.Router();
const { globalRoute } = require('../../utils/globalRoute');
const productController = require('../../controllers/productController');

router.post('/', productController.addProduct);
router.get('/view-product/:id', productController.viewProduct);
router.post('/list-of-product', productController.listOfProduct);
router.get('/get-product-list', productController.getProductList);
router.put('/update-product/:id', productController.updateProduct);
router.delete('/delete-product/:id', productController.deleteProduct);
router.all('*', globalRoute);

module.exports = router;
