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
        const blogCreated = await Blog.create(blog);
        return apiResponse.successResponseWithData(
            res,
            'Add new blog successfully',
            blogCreated
        );
    }
    updateBlog = async (req, res) => {
        const blog = req.body;
        await Blog.findByIdAndUpdate(req.params.blogId,
            {
                $set: {
                    blogTitle: blog.blogTitle,
                    blogTopic: blog.blogTopic,
                    blogCoverPhoto: blog.blogCoverPhoto,
                    blogHTML : blog.blogHTML,
                    isCensored: blog.isCensored,
                }
            });

        return apiResponse.successResponse(
            res,
            'Update blogs successfully',
        );
    }
    deleteBlog = async (req, res) => {
        await Blog.findByIdAndUpdate(req.params.blogId,
            {
                $set: {
                   isDeleted: true
                }
            });

        return apiResponse.successResponse(
            res,
            'Delete blogs successfully',
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
        const blog = await Blog.find({ isCensored: true, isDeleted: false }).sort({ createdAt: -1 }).populate("author").limit(5);
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
        const blog = await Blog.find({ blogTopic: blogTopic, isCensored: true, isDeleted: false }).populate("author").limit(5);
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
            isDeleted: false, isCensored: true
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
    getAllBLogAdmin = async (req, res) => {
        const listBlog = await Blog.find({ isCensored: false, isDeleted: false }).populate("author");
        if (listBlog) {
            return apiResponse.successResponseWithData(
                res,
                'Get product successfully',
                listBlog
            );
        } else {
            return apiResponse.ErrorResponse(
                res,
                'No find blogs',
            );
        }
    }
}
module.exports = new BlogController();