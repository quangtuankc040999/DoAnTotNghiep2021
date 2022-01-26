const Order = require('../models/Order')
const apiResponse = require('../../utils/apiResponse')

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

}
module.exports = new OrderController;
