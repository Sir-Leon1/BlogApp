const express = require('express');
const { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog,
  getLatestBlogs,
  getBlogsByUser,
  getBlogTags,
  getUserReadHistory,
  getFeaturedBlog, getBlogAuthor} = require('../controllers/blogControllers');
const { authenticate } = require('../middlewares/auth');
const { validateBlog } = require('../middlewares/validation');

const router = express.Router();

router.post('/blogs', validateBlog, createBlog);
router.get('/blogs', getBlogs);
router.get('/blogs/:id', getBlogById);
router.put('/blogs/:id', validateBlog, updateBlog);
router.delete('/blogs/:id', deleteBlog);

router.get('/blogs/:id/author',  getBlogAuthor);
router.get('blogs/latest', getLatestBlogs);
router.get('/blogs/users/:id', getBlogsByUser);

router.get('/blogs/tags', getBlogTags);
router.get('/blogs/history/:id', getUserReadHistory);
router.get('/blogs/featured', getFeaturedBlog);

module.exports = router;