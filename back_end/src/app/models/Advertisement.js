const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Advertisement = new Schema(
    {
        adBanner: { type: String },
        linkBlog: {type: String}
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Advertisement', Advertisement, 'Advertisement');