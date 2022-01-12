const express = require('express');
const router = express.Router();
const productController = require('../../app/controllers/ProductController');

router.post('/', productController.addNewProduct);
router.get('/', productController.getAllProduct);
router.get('/:productId', productController.getProduct);
router.get('/category/:categoryName', productController.getProductByCategoryName);
router.get('/category/:categoryName/:categoryDetail', productController.getProductByCategoryNameAndCategoryDetail);
router.get('/brand/:brandName', productController.getProductByBrand);
router.put('/update/:productId', productController.updateProduct);
router.put('/delete/:productId', productController.deleteProduct);
module.exports = router;