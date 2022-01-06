const express = require('express');
const router = express.Router();
const categoryController = require('../../app/controllers/CategoryController');

router.post('/category', categoryController.getCategory);
module.exports = router;