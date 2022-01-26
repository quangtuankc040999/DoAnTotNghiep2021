const express = require('express');
const router = express.Router();
const orderController = require('../../app/controllers/OrderController');
router.post('/', orderController.addNewOrder);

module.exports = router;
