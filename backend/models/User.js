
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: false,
    unique: false
  },
  location: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  categories: [{
    type: String,
    required: false,
  }],
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    bio: String,
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
  },
  socialLinks: [
    {
      platform: { type: String, required: true},
      url: { type: String, required: true }
    }
  ],
  readHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);