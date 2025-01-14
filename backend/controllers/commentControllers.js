const Comment = require('../models/Comment');
const mongoose = require("mongoose");

const createComment = async (req, res) => {
  console.log("createComment");
  const {authorId} = req.params;
  try {
    const { blogId, content } = req.body.data;

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({error: 'Invalid authorId'});
    }

    const newComment = new Comment({
      blogId,
      authorId,
      content
    });

    const comment = await newComment.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment', error });
  }
};

// Get comments for a specific blog post
const getCommentsByBlogId = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blogId }).populate('authorId', 'username');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error });
  }
};

module.exports = {
  createComment,
  getCommentsByBlogId,
  updateComment,
  deleteComment
};