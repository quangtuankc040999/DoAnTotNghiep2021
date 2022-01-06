const express = require('express');
const router = express.Router();
const ProductController = require('../../app/controllers/ProductController');

router.post('/product', ProductController.getCategory);
module.exports = router;