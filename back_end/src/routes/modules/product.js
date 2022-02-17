const express = require('express');
const router = express.Router();
const productController = require('../../app/controllers/ProductController');
const rattingController = require('../../app/controllers/RattingController')

router.post('/', productController.addNewProduct);
router.get('/', productController.getAllProduct);
router.post('/comment/', rattingController.postNewComment);
router.get('/comment/:productId', rattingController.getCommentByProductId);
router.get('/comment/:productId/:page', rattingController.getCommentByProductId);
router.get('/:productId', productController.getProduct);
router.get('/category/:categoryName', productController.getProductByCategoryName);
router.get('/category/:categoryName/:categoryDetail', productController.getProductByCategoryNameAndCategoryDetail);
router.get('/brand/:brandName', productController.getProductByBrand);
router.put('/update/:productId', productController.updateProduct);
router.put('/delete/:productId', productController.deleteProduct);
module.exports = router;