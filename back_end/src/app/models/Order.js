const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Order = new Schema(
    {   
        emailSeller: {type: String, default: "admin@gmail.com"},
        customerId: { type: String },
        customerName: { type: String },
        customerPhone: { type: String },
        customerEmail: {type:String},
        product: [{type: Object}],
        localization: { type: String, require: true },
        status: { type: String, default: "Chờ xác nhận" },
        additionalInformation: { type: String },
        total: { type: Number },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('Order', Order, 'Order');