const express = require('express');
const {
  createBlog, getBlogs, getSpecificBlog, updateBlog, deleteBlog,
  getLatestBlogs, getBlogsByUser, getBlogTags,
  getFeaturedBlog, getBlogAuthor
} = require('../controllers/blogControllers');
const { authenticate } = require('../middlewares/auth');
const { validateBlog, validateBlogUpdate } = require('../middlewares/validation');

const router = express.Router();

router.post('/blogs/:authorId', validateBlog, createBlog);
router.get('/blogs', getBlogs);
router.get('/blogs/latest', getLatestBlogs);
router.put('/blogs/:id', validateBlog, validateBlogUpdate, updateBlog);
router.delete('/blogs/:id', deleteBlog);
router.get('/blogs/featured', getFeaturedBlog);

router.get('/blogs/:id/author', getBlogAuthor);
router.get('/blogs/:id', getSpecificBlog);
router.get('/blogs/users/:user_id', getBlogsByUser);

router.get('/blogs/tags', getBlogTags);

module.exports = router;