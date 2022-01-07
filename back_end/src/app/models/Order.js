const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Order = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        product: [{
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }],
        address:{type: String, require: true},
        status:{type: String, default: "Chờ xác nhận"},
        additional_information: {type: String},
        total: {type:Number},
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('Order', Order, 'Order');