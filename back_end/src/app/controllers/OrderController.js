const Order = require('../models/Order')
const apiResponse = require('../../utils/apiResponse');
const Log = require('../models/Log');

class OrderController {
    //create order
    addNewOrder = async (req, res) => {
        const order = req.body;
        await Order.create(order);
        return apiResponse.successResponse(
            res,
            'create order successfully',
        );
    }
    updateOrder = async (req, res) => {
        const order = req.body;
        await Order.findByIdAndUpdate(req.params.orderId,
            {
                $set: {
                    customerPhone: order.customerPhone,
                    localization: order.localization,
                    status: order.status,
                    additionalInformation: order.additionalInformation,
                    note: order.note
                }
            });
        return apiResponse.successResponse(
            res,
            'Update order successfully',
        );
    }
    getOrderById = async (req, res) => {
        const order = await Order.findOne({ _id: req.params.orderId });
        return apiResponse.successResponseWithData(
            res,
            'Get successfully',
            order,
        );
    }
    //admin 
    getOrderWaittingAdmin = async (req, res) => {
        const listOrderUserWaitting = await Order.find({status: 'Chờ xác nhận', createAt: -1 });
        return apiResponse.successResponseWithData(
            res,
            'Get successfully',
            listOrderUserWaitting,
        );
    }
    getOrderDeliveryAdmin = async (req, res) => {
        const listOrderUserDelivery= await Order.find({status: 'Đã đóng gói, đang vận chuyển', createAt: -1 });
        return apiResponse.successResponseWithData(
            res,
            'Get successfully',
            listOrderUserDelivery,
        );
    }
    getOrderRatedAdmin = async (req, res) => {
        const listOrderUserRated = await Order.find({status: 'Đã đánh giá', createAt: -1 });
        return apiResponse.successResponseWithData(
            res,
            'Get successfully',
            listOrderUserRated
        );
    }
    // user
    getOrderWaittingUser = async (req, res) => {
        const listOrderUserWaitting = await Order.find({ customerId: req.params.customerId, status: 'Chờ xác nhận' });
        return apiResponse.successResponseWithData(
            res,
            'Get successfully',
            listOrderUserWaitting,
        );
    }
    getOrderDeliveryUser = async (req, res) => {
        const listOrderUserDelivery = await Order.find({ customerId: req.params.customerId, status: 'Đã đóng gói, đang vận chuyển' });
        return apiResponse.successResponseWithData(
            res,
            'Get successfully',
            listOrderUserDelivery,
        );
    }
    getOrderDeleteUser = async (req, res) => {
        const listOrderUserDeleted = await Order.find({ customerId: req.params.customerId, status: 'Đã huỷ' });
        return apiResponse.successResponseWithData(
            res,
            'Get successfully',
            listOrderUserDeleted,
        );
    }
    getOrderDoneUser = async (req, res) => {
        const listOrderUserDone = await Order.find({ customerId: req.params.customerId, status: 'Đã hoàn thành' });
        return apiResponse.successResponseWithData(
            res,
            'Get successfully',
            listOrderUserDone,
        );
    }
    getOrderRatedUser = async (req, res) => {
        const listOrderUserRated = await Order.find({ customerId: req.params.customerId, status: 'Đã đánh giá' });
        return apiResponse.successResponseWithData(
            res,
            'Get successfully',
            listOrderUserRated,
        );
    }
}
module.exports = new OrderController;
