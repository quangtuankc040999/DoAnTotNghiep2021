const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog = new Schema(
    {
        blogTitle: { type: String, require: true },
        blogCoverPhoto: { type: String, require: true },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        blogTopic: { type: String },
        blogHTML: { type: String },
        isCensored: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Blog', Blog, 'Blog');