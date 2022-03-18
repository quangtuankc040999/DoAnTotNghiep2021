const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = new Schema({
    title: { type: String },
    brand: { type: String },
    product_key: { type: String },
    popularity: { type: Number, default: 1 },
    rating: { type: Number, default: 0 },
    image: [{type: String, default: 0 }],
    import_price: { type: Number },
    starting_price: { type: Number, default: 0 },
    discount: { type: Number, default: 0},
    sale_price: { type: Number, default: 0},
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
