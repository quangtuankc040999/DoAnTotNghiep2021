const express = require('express');
const router = express.Router();
const orderController = require('../../app/controllers/OrderController');
router.post('/', orderController.addNewOrder);
router.get('/user/:orderId', orderController.getOrderById);
router.put('/user/:orderId', orderController.updateOrder);
//user
router.get('/user/waitting-order/:customerId', orderController.getOrderWaittingUser)
router.get('/user/delivery-order/:customerId', orderController.getOrderDeliveryUser)
router.get('/user/cancel-order/:customerId', orderController.getOrderDeleteUser)
router.get('/user/done-order/:customerId', orderController.getOrderDoneUser)


module.exports = router;
