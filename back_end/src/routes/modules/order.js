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
router.get('/user/rated-order/:customerId', orderController.getOrderRatedUser)
//
router.get('/admin/waitting-order', orderController.getOrderWaittingAdmin)
router.get('/admin/delivery-order', orderController.getOrderDeliveryAdmin)
router.get('/admin/rated-order', orderController.getOrderRatedAdmin)

router.post('/dashboard/get-order-by-month', orderController.getOrderByMonth)
module.exports = router;
