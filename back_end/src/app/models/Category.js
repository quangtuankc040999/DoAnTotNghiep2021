const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = new Schema(
    {
        categoryName : {type: String, require: true },
        categoryDetail : {type: String, require: true },
    }
);
module.exports = mongoose.model('Category', Category, 'Category');