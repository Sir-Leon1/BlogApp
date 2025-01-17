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
  let image = null;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'Invalid user id'});
  }

  const userId = new mongoose.Types.ObjectId(id);
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({error: 'User not Found'});
  }

  if (user.profile.imageData) {
    image = `data:${user.profile.imageContentType};base64,${user.profile.imageData.toString('base64')}`;
  } else if (user.imageUrl) {
    image = user.profile.imageUrl;
  }

  const data = {
    image: image,
    username: user.username,
    fullName: user.fullName,
    location: user.location,
    website: user.website,
    categories: user.categories,
    email: user.email,
    bio: user.profile.bio,
    socialLinks: user.socialLinks
  }
  console.log(data);
  res.status(200).json(data)

}

const updateProfile = async (req, res) => {
  console.log("updateProfile")
  //console.log(req);
  upload.single('image')(req, res, async (err) => {
    let user, imageData, imageContentType, image, socialLinks;
    if (err) {
      return res.status(400).json({error: 'Image upload failed:' + err.message});
    }
    if (req.file) {
      imageData = req.file.buffer;
      imageContentType = req.file.mimetype;
    }
    console.log(req.file);
    console.log(req.body);
    const {
      username, imageUrl, fullName, email, bio, location, website, categories
    } = req.body;
    if (req.body.socialLinks) {
      socialLinks = JSON.parse(req.body.socialLinks);
    }
    imageUrl ? image = imageUrl : image = null;
    const {userId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({error: 'Invalid authorId'});
    }
    const currentUserId = new mongoose.Types.ObjectId(userId);
    user = await User.findById(currentUserId);

    if (!req.file) {
      if (!username) {
        return res.status(400).json({error: 'Username Required'});
      }
    }

    try {
      if (req.file) {
        user.profile.imageData = imageData;
        user.profile.imageContentType = imageContentType;
      } else if (image) {
        user.profile.imageUrl = image;
      } else {
        user.username = username;
        user.fullName = fullName;
        user.email = email;
        user.profile.bio = bio;
        user.location = location;
        user.website = website;
        user.categories = categories;
        user.socialLinks = socialLinks;
      }
      await user.save();
      //console.log(user);

      if (user.profile.imageData) {
        image = `data:${user.profile.imageContentType};base64,${user.profile.imageData.toString('base64')}`;
      }
      const data = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        bio: user.profile.bio,
        location: user.location,
        website: user.website,
        socialLinks: socialLinks,
        categories: user.categories,
        image: image,
      }
      console.log(data);
      res.status(201).json(data);
    } catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({error: 'An unexpected error occurred'});
    }
  });
};


module.exports = {getUserReadHistory, addViewedBlog, getViewedBlogs, getUser, updateProfile};