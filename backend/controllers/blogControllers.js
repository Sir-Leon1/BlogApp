const Blog = require('../models/Blog');
const Tag = require('../models/Tag');
const User = require('../models/User');
const mongoose = require("mongoose");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const moment = require("moment");

const createBlog = async (req, res) => {
  console.log("createBlog")
  console.log(req.title);
  upload.single('coverImage')(req, res, async (err) => {
    let blog, imageData, imageContentType, image;
    if (err) {
      return res.status(400).json({error: 'Image upload failed:' + err.message});
    }
    if (req.file) {
      imageData = req.file.buffer;
      imageContentType = req.file.mimetype;
    }
    console.log(req.file);
    console.log(req.body);
    const {title, content, imageUrl, category} = req.body;
    imageUrl ? image = imageUrl : image = null;
    const {authorId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({error: 'Invalid authorId'});
    }

    if (!title || !content) {
      return res.status(400).json({error: 'Title and content are required'});
    }

    try {
      if (req.file) {
        blog = new Blog({
          title,
          content,
          category,
          authorId: new mongoose.Types.ObjectId(authorId),
          imageData: imageData,
          imageContentType: imageContentType
        });
      } else if (image) {
        blog = new Blog({
          title,
          content,
          category,
          authorId: new mongoose.Types.ObjectId(authorId),
          imageUrl: image,
        })
      } else {
        blog = new Blog({title, content, authorId: new mongoose.Types.ObjectId(authorId)});
      }
      await blog.save();
      console.log(blog);
      await blog.populate({
        path: 'authorId',
        select: 'username',
        options: {strictPopulate: false}
      });
      if (blog.imageData) {
        image = `data:${blog.imageContentType};base64,${blog.imageData.toString('base64')}`;
      }
      const data = {
        id: blog._id,
        title: blog.title,
        content: blog.content,
        image: image,
        authorId: blog.authorId,
        author: blog.authorId.username,
        category: blog.category,
      }
      console.log(data);
      res.status(201).json(data);
    } catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({error: 'An unexpected error occurred'});
    }
  });
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username');
    res.status(200).json(blogs);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({error: 'An unexpected error occurred'});
  }
};

const getSpecificBlog = async (req, res) => {
  let image;
  const {id} = req.params;
  console.log("getSpecificBlog");
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'Invalid blog ID'});
    }
    const blogId = new mongoose.Types.ObjectId(id);
    const blog = await Blog.findById(blogId).populate(
      {
        path: 'authorId', select: 'username'
      },
    );
    await blog.populate({
      path: 'comments.authorId',
      select: 'username',
      options: {strictPopulate: false}
    })
    if (!blog) {
      return res.status(404).json({error: 'Blog not found'});
    }
    const likeCount = blog.likes ? blog.likes.length : 0;
    const viewCount = blog.views ? blog.views.length : 0;
    blog.imageData ? image = `data:${blog.imageContentType};base64,${blog.imageData.toString('base64')}` : image = null;

    const comments = blog.comments;
    comments.map(comment => {
      let timestamp = comment.createdAt;
      comment.createdAt = moment(timestamp).format("MMMM D, YYYY [at] h:mm a");
    })
    const data = {
      id: blog._id,
      title: blog.title,
      content: blog.content,
      image: image,
      authorId: blog.authorId,
      author: blog.authorId.username,
      category: blog.category,
      likes: likeCount,
      views: viewCount,
      comments: comments,
    };
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({error: 'An unexpected error occurred'});
  }
};

const updateBlog = async (req, res) => {
  let {id} = req.params;
  let image;
  const {title, content, authorId} = req.body.data;
  try {
    const blogId = new mongoose.Types.ObjectId(id);
    const blog = await Blog.findById(blogId);

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({error: 'Invalid authorId'});
    }
    if (!blog) {
      return res.status(404).json({error: 'Blog not found'});
    }

    if (blog.authorId.toString() !== authorId) {
      return res.status(403).json({error: 'Unauthorized'});
    }
    blog.title = title;
    blog.content = content;
    await blog.save();
    blog.imageData ? image = `data:${blog.imageContentType};base64,${blog.imageData.toString('base64')}` : image = null;

    const data = {
      id: blog._id,
      title: blog.title,
      content: blog.content,
      image: image,
      authorId: blog.authorId,
      author: blog.authorId.username,
      category: blog.category,
    }
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({error: 'An unexpected error occurred'});
  }
};

const deleteBlog = async (req, res) => {
  const {id} = req.params;
  try {
    const blogId = new mongoose.Types.ObjectId(id);
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({error: 'Blog not found'});
    }
    await blog.deleteOne({_id: blogId});
    const data = {message: 'Blog deleted successfully'};
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({error: 'An unexpected error occurred'});
  }
};

const getBlogAuthor = async (req, res) => {
  console.log('getBlogAuthor');
  const {id} = req.params;
  try {
    /**
     * Should return a json with the image, name
     * , bio and social links of the author only */
    if (!id) {
      return res.status(400).json({error: 'Author Id is required'});
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'Invalid AuthorId'});
    }

    //check if there is a user with the id given
    if (!User.exists({_id: id})) {
      return res.status(404).json({error: 'Author not found'});
    }
    console.log('here');
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({error: 'Author not Found'});
    }
    const data = {
      //image: blog.author.image,
      name: user.username,
      profile: user.profile,
      social_links: user.socialLinks,
    };
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({error: 'An unexpected error occurred'});

  }
}

const getLatestBlogs = async (req, res) => {
  /**
   * Should return a json with blogs that have a high number of likes,
   * The blogs should contain the :
   * id, title, authors name, authorid, category
   * content, image if it is there, */
  console.log("Getting Latest blogs");
  let image;
  try {
    const blogs = await Blog.find().
    sort({createdAt: -1}).
    limit(10).
    populate('authorId', 'username');

    const data = blogs.map(blog => {
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
      };
    });

    if (!data) {
      return res.status(404).json({error: 'No blogs found'});
    }
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({error: 'An unexpected error occurred'});
  }
};

const getBlogsByUser = async (req, res) => {
  console.log('getBlogsByUser');
  /**
   * Should return a json of all the blogs a specific user has written
   * The blogs should contain the post id, image, category, title, author
   * */
  const {user_id} = req.params;
  let image;
  console.log(user_id);

  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(400).json({error: 'Invalid authorId'});
  }

  const authorId = new mongoose.Types.ObjectId(user_id);
  const authorExists = await User.exists({_id: authorId});
  if (!authorExists) {
    return res.status(404).json({error: 'Author not found'});
  }

  try {
    const blogs = await Blog.find({authorId: authorId}).populate('authorId', 'username');
    const data = blogs.map(blog => {
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
      };
    });
    if (!blogs) {
      return res.status(404).json({error: 'No blogs found'});
    }
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({error: 'An unexpected error occurred'});
  }
};

const getBlogTags = async (req, res) => {
  /**
   * Should return a json of all the tags saved in the database.
   * The tag should contain id, image, name
   * */
  try {
    const tags = await Tag.find();
    if (!tags) {
      return res.status(404).json({error: 'No tags found'});
    }
    const data = tags.map(tag => ({
      id: tag._id,
      image: tag.image,
      name: tag.name,
    }));
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({error: 'An unexpected error occurred'});
  }
};


const getFeaturedBlog = async (req, res) => {
  /**
   * Should return a json with the blog that has the most number of likes.
   * */
  let image;
  try {
    console.log('here');
    const blog = await Blog.findOne().sort({likes: -1}).populate({
      path: 'authorId',
      select: 'username',
      options: {strictPopulate: false}
    });
    if (!blog) {
      return res.status(404).json({error: 'No blogs found'});
    }
    blog.imageData ? image = `data:${blog.imageContentType};base64,${blog.imageData.toString('base64')}` : image = null;

    const data = {
      id: blog._id,
      title: blog.title,
      content: blog.content,
      image: image,
      authorId: blog.authorId,
      author: blog.authorId.username,
      category: blog.category,
    };
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({error: 'An unexpected error occurred'});
  }
}


module.exports = {
  createBlog, getBlogs, getSpecificBlog, updateBlog, deleteBlog,
  getLatestBlogs,
  getBlogsByUser,
  getBlogTags,
  getFeaturedBlog,
  getBlogAuthor
};