const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentBlog = new Schema(
    {
        blog: {
            type: Schema.Types.ObjectId,
            ref: 'Blog',
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        content: {type: String}
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('CommentBlog', CommentBlog, 'CommentBlog');