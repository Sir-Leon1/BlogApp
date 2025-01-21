const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageData: {
    type: Buffer,
    required: false
  },
  imageContentType: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false
  },
  tags: [String],
  comments: [{
    commentId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Comments',
      required: true
    },
    content: String,
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
  }, { timestamps: true }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);