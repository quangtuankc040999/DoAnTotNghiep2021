const apiResponse = require('../../utils/apiResponse');
const host = require('../../utils/decodeJWT');
const User = require('../models/User')
const CommentBlog = require('../models/CommentBlog')
const Blog = require('../models/Blog')
class CommentBlogController {
    createNewCommentBlog = async (req, res) => {
        const user = await User.findById(host(req, res));
        let commentParams = req.body;
        let blog = await Blog.findById(commentParams.blogId)
        let commentBlog = new CommentBlog()
        commentBlog.content = commentParams.commentContent
        commentBlog.blog = blog;
        commentBlog.author = user
        await CommentBlog.create(commentBlog);
        return apiResponse.successResponse(
            res,
            'Add new comment successfully',
        );
    }
    getAllCommentByBlogId = async (req, res) => {
        let limit = 3
        let blog = await Blog.findById(req.params.blogId)
        const listComment = await CommentBlog.find({ "blog": blog }).sort({ createdAt: -1 }).populate("author").populate("blog").populate("reply.authorReply").limit(limit).skip(limit * (req.params.page - 1));
        const numberRecord = await CommentBlog.find({ "blog": blog }).count()
        let numberPages = Math.ceil(numberRecord / limit)
        let data = { "listComment": listComment, "numberPages": numberPages, "numberRecords": numberRecord }
        return apiResponse.successResponseWithData(
            res,
            'Get Product successfully',
            data
        );
    }

    updateCommnentByCommentId = async (req, res) => {
        const reply = req.body;
        const authorReply =  await User.findById(host(req, res));
        const contentReply = reply.contentReply
        await CommentBlog.findByIdAndUpdate(req.params.commentBlogId,
            {
                $push: { reply: { authorReply: authorReply, contentReply: contentReply }} 
            });
        return apiResponse.successResponse(
            res,
            'Update order successfully',
        );
    }
}
module.exports = new CommentBlogController();