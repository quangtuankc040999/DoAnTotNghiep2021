const express = require('express');
const router = express.Router();
const CommentBlogController = require('../../app/controllers/CommentBlogController');
router.post('/', CommentBlogController.createNewCommentBlog);
router.get('/:blogId/:page', CommentBlogController.getAllCommentByBlogId)
router.post('/:commentBlogId', CommentBlogController.updateCommnentByCommentId)



module.exports = router;