const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = new Schema({

});
module.exports = mongoose.model('Product', Product, 'Product');
