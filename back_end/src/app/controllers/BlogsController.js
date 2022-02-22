const apiResponse = require('../../utils/apiResponse');
const host = require('../../utils/decodeJWT');
const User = require('../models/User')
const Blog = require('../models/Blog')
class BlogController {
    createNewBlog = async (req, res) => {
        const user = await User.findById(host(req, res));
        let blogParams = req.body;
        let blog = new Blog();
        blog.author = user;
        blog.blogTitle = blogParams.blogTitle;
        blog.blogTopic = blogParams.blogTopic;
        blog.blogCoverPhoto = blogParams.blogCoverPhoto;
        blog.blogHTML = blogParams.blogHTML;
        if (blogParams.isCensored) {
            blog.isCensored = blogParams.isCensored;
        }
        await Blog.create(blog);
        return apiResponse.successResponse(
            res,
            'Add new blog successfully',
        );
    }
    getBlogById = async (req, res) => {
        const blog = await Blog.findById(req.params.blogId).populate("author");
        if (blog) {
            return apiResponse.successResponseWithData(
                res,
                'Get product successfully',
                blog
            );
        } else {
            return apiResponse.ErrorResponse(
                res,
                'No find blogs',
            );
        }
    }
    getLastestBlog = async (req, res) => {
        const blog = await Blog.find().sort({ createdAt: 1 }).populate("author").limit(5);
        if (blog) {
            return apiResponse.successResponseWithData(
                res,
                'Get product successfully',
                blog
            );
        } else {
            return apiResponse.ErrorResponse(
                res,
                'No find blogs',
            );
        }
    }
    getByTopic = async (req, res) => {
        const blogTopic = req.body.blogTopic
        const blog = await Blog.find({ blogTopic: blogTopic }).populate("author").limit(5);
        if (blog) {
            return apiResponse.successResponseWithData(
                res,
                'Get product successfully',
                blog
            );
        } else {
            return apiResponse.ErrorResponse(
                res,
                'No find blogs',
            );
        }
    }

    getAllBlog = async (req, res) => {
        let limit = 4;
        const listBlogs = await Blog.find({
            isDeleted: false,
        }).limit(limit).skip(limit * (req.params.page - 1)).populate("author");
        const numberRecord = await Blog.find({
            isDeleted: false,
        }).count()
        let numberPages = Math.ceil(numberRecord / limit)
        let data = { "listBlogs": listBlogs, "numberPages": numberPages, "numberRecords": numberRecord }
        return apiResponse.successResponseWithData(
            res,
            'Get Product successfully',
            data
        );
    }
}
module.exports = new BlogController();