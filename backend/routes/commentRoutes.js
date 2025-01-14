// backend/routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const {
  createComment,
  getCommentsByBlogId,
  updateComment,
  deleteComment
} = require('../controllers/commentControllers');

router.post('/comments/:authorId', createComment);
router.get('/:blogId', getCommentsByBlogId);
router.put('/:commentId', updateComment);
router.delete('/:commentId', deleteComment);

module.exports = router;