const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = new Schema(
    {
        name: { type: String, require: true },
        categoryDetails: [{
            type: String
        }],
    }
);
module.exports = mongoose.model('Category', Category, 'Category');