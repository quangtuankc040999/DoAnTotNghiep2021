const express = require('express');
const router = express.Router();
const BlogController = require('../../app/controllers/BlogsController');
const AdController = require('../../app/controllers/AdController')
router.post('/', BlogController.createNewBlog);
router.get('/lastest', BlogController.getLastestBlog);
router.put('/topic', BlogController.getByTopic)
router.get('/detail/:blogId', BlogController.getBlogById);
router.get('/all/:page', BlogController.getAllBlog);
router.get('/admin',  BlogController.getAllBLogAdmin)
router.put('/update/:blogId', BlogController.updateBlog)
router.put('/delete/:blogId', BlogController.deleteBlog)
router.post('/ad/', AdController.createNewAd)
router.get('/ad/', AdController.getAllAd)
module.exports = router;