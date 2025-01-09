const express = require('express');
const {
  getUserReadHistory, addViewedBlog
} = require('../controllers/userController');
const { authenticate } = require('../middlewares/auth');
const { validateUser, validateUserUpdate } = require('../middlewares/validation');

const router = express.Router();
/**
router.post('/users', validateUser, createUser);
router.get('/users/:id', getUser);
router.put('/users/:id', validateUserUpdate, updateUser);
router.delete('/users/:id', deleteUser);
router.get('/users/:id/blogs', getUserBlogs);
  */
router.get('/users/history/:id', getUserReadHistory);
router.post('/users/history', addViewedBlog)

module.exports = router;