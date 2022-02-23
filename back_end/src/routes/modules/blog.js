const express = require('express');
const router = express.Router();
const BlogController = require('../../app/controllers/BlogsController');
router.post('/', BlogController.createNewBlog);
router.get('/lastest', BlogController.getLastestBlog);
router.put('/topic', BlogController.getByTopic)
router.get('/detail/:blogId', BlogController.getBlogById);
router.get('/all/:page', BlogController.getAllBlog);
router.get('/admin',  BlogController.getAllBLogAdmin)
router.put('/update/:blogId', BlogController.updateBlog)
router.put('/delete/:blogId', BlogController.deleteBlog)
module.exports = router;