const User = require('../models/User');
const Blog = require('../models/Blog');
const mongoose = require("mongoose");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const getUserReadHistory = async (req, res) => {
  /**
   * Should return a json of blogs opened recently by a user,
   *
   * */
  const {id} = req.params;
  try {
    const user = await User.findById(id).populate('readHistory');
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }
    const data = user.readHistory.map(blog => {
      let image = null;
      if (blog.imageData) {
        image = `data:${blog.imageContentType};base64,${blog.imageData.toString('base64')}`;
      } else if (blog.imageUrl) {
        image = blog.imageUrl;
      }

      return {
        id: blog._id,
        title: blog.title,
        content: blog.content,
        image: image,
        authorId: blog.authorId,
        author: blog.authorId.username,
        category: blog.category,
      }
    });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({error: 'An unexpected error occurred'});
  }
}

const addViewedBlog = async (req, res) => {
  const {userId, blogId} = req.body.data;
  try {

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({error: 'Invalid blog ID'});
    } else if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({error: 'Invalid blog ID'});
    }

    const idUser = new mongoose.Types.ObjectId(userId);
    const idBlog = new mongoose.Types.ObjectId(blogId);

    const user = await User.findById(idUser);
    if (!user) return res.status(404).json({error: 'User not found'});

    user.readHistory.push(idBlog);
    await user.save();
    await user.populate('readHistory');
    const data = user.readHistory.map(blog => {
      let image = null;
      if (blog.imageData) {
        image = `data:${blog.imageContentType};base64,${blog.imageData.toString('base64')}`;
      } else if (blog.imageUrl) {
        image = blog.imageUrl;
      }

      return {
        id: blog._id,
        title: blog.title,
        content: blog.content,
        image: image,
        authorId: blog.authorId,
        readHistory: blog.read
      }
    });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({error: 'An unexpected error occurred'});
  }
};

const getViewedBlogs = async (req, res) => {
  const {userId} = req.params;
  try {
    const user = await User.findById(userId).populate('readHistory');
    if (!user) return res.status(404).json({error: 'User not found'});

    const data = user.readHistory.map(blog => {
      let image = null;
      if (blog.imageData) {
        image = `data:${blog.imageContentType};base64,${blog.imageData.toString('base64')}`;
      } else if (blog.imageUrl) {
        image = blog.imageUrl;
      }

      return {
        id: blog._id,
        title: blog.title,
        content: blog.content,
        image: image,
        authorId: blog.authorId,
      }
    });
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({error: 'An unexpected error occurred'});
  }
};

const getUser = async (req, res) => {
  console.log("GetUser");
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'Invalid user id'});
  }

  const userId = new mongoose.Types.ObjectId(id);
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({error: 'User not Found'});
  }

  const data = {
    username: user.username,
    fullName: user.fullname,
    email: user.email,
    bio: user.profile.bio,
    socialLinks: user.socialLinks
  }
  console.log(data);
  res.status(200).json(data)

}


module.exports = {getUserReadHistory, addViewedBlog, getViewedBlogs, getUser};