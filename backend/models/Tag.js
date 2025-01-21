const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
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
  }
});

module.exports = mongoose.model('Tag', tagSchema);