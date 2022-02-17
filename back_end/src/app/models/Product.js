const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = new Schema({
    title: { type: String },
    brand: { type: String },
    product_key: { type: String },
    popularity: { type: Number, default: 1 },
    rating: { type: Number, default: 0 },
    image: [{type: String, default: 0 }],
    starting_price: { type: Number },
    discount: { type: Number, default: 0},
    sale_price: { type: Number },
    description: { type: String, default: ""},
    category_name: { type: String },
    category_detail: { type: String },
    inventory:{type: Number, default: 0},
    is_deleted: { type: Boolean, default: false },
},
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('Product', Product, 'Product');
