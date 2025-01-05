const Blog = require('../models/Blog');
const Tag = require('../models/Tag');

const createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = new Blog({ title, content, author: req.user._id });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username');
    res.status(200).json(blogs);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate('author', 'username');
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    blog.title = title;
    blog.content = content;
    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await blog.remove();
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

const getBlogAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    /**
     * Should return a json with the image, name
     * , bio and social links of the author only */
    const blog = await Blog.findById(id).populate('author');
    if (!blog) {
      return res.status(404).json({ error: 'Author not Found' });
    }
    const data = {
      image: blog.author.image,
      name : blog.author.name,
      bio : blog.author.bio,
      social_links : blog.author.social_links,
    };
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'An unexpected error occurred' });

  }
}

const getLatestBlogs = async (req, res) => {
  /**
   * Should return a json with blogs that have a high number of likes,
   * The blogs should contain the :
   * id, title, authors name, authorid, category
   * content, image if it is there, */
  try {
    const blogs = await Blog.find().sort({ likes: -1 }).limit(10).populate('author', 'username');
    const data = blogs.map(blog => ({
      id: blog._id,
      title: blog.title,
      author: blog.author.username,
      authorid: blog.author._id,
      category: blog.category,
      content: blog.content,
      image: blog.image,
    }));
    if (!data) {
      return res.status(404).json({ error: 'No blogs found' });
    }
    res.status(200).json(data);
    } catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

const getBlogsByUser = async (req, res) => {
  /**
   * Should return a json of all the blogs a specific user has written
   * The blogs should contain the post id, image, category, title, author
   * */
  const { id } = req.params;
  try {
    const blogs = await Blog.find({author: id});
    const data = blogs.map(blog => ({
      id: blog._id,
      image: blog.image,
      category: blog.category,
      title: blog.title,
      author: blog.author,
    }));
    if (!blogs) {
      return res.status(404).json({error: 'No blogs found'});
    }
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'An unexpected error occurred' });
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
      res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

const getUserReadHistory = async (req, res) => {
  /**
   * Should return a json of blogs opened recently by a user,
   *
   * */
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate('readHistory');
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }
    const data = user.readHistory.map(blog => ({
      id: blog._id,
      title: blog.title,
      author: blog.author.username,
      category: blog.category,
      content: blog.content,
      image: blog.image,
    }));
    res.status(200).json(data);
    } catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ error: 'An unexpected error occurred' });
  }
}

const getFeaturedBlog = async (req, res) => {
  /**
   * Should return a json with the blog that has the most number of likes.
   * */
  try {
    const blog = await Blog.findOne().sort({ likes: -1 }).populate('author', 'username');
    if (!blog) {
      return res.status(404).json({error: 'No blogs found'});
    }
    const data = {
      id: blog._id,
      title: blog.title,
      author: blog.author.username,
      authorid: blog.author._id,
      category: blog.category,
      content: blog.content,
      image: blog.image,
    };
    res.status(200).json(data);
    } catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ error: 'An unexpected error occurred' });
  }
}

module.exports = { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog,
getLatestBlogs,
getBlogsByUser,
getBlogTags,
getUserReadHistory,
getFeaturedBlog ,
getBlogAuthor
};