const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ratting = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    product: { type: Object },
    star: { type: Number },
    content: { type: String },
    images: [{ type: String }],

}, {
    timestamps: true,
})
module.exports = mongoose.model('Ratting', Ratting, 'Ratting');