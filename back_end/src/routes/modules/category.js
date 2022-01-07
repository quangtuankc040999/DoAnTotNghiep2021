const express = require('express');
const router = express.Router();
const categoryController = require('../../app/controllers/CategoryController');

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategory);
router.put('/:categoryId', categoryController.updateCategory);


module.exports = router;