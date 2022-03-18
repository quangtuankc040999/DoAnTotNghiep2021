const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Log = new Schema({
    status: { type: String },
    logContents: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            }, 
            quantity: {type: Number}
        }
    ],
}, {
    timestamps: true,
})
module.exports = mongoose.model('Log', Log, 'Log');