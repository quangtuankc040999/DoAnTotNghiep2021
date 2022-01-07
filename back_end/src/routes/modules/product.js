const express = require('express');
const router = express.Router();
const productController = require('../../app/controllers/ProductController');

router.post('/', productController.addNewProduct);
router.get('/category/:categoryName', productController.getProductByCategoryName);
router.get('/category/:categoryName/:categoryDetail', productController.getProductByCategoryNameAndCategoryDetail);
router.get('/brand/:brandName', productController.getProductByBrand);
module.exports = router;