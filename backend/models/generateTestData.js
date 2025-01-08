const mongoose = require('mongoose');
const User = require('./User'); // Adjust the path as necessary
const Blog = require('./Blog'); // Adjust the path as necessary
const Tag = require('./Tag'); // Adjust the path as necessary
const connectDB = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

const generateTestData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Blog.deleteMany({});

    // Create users
    const users = [];
    for (let i = 1; i <= 10; i++) {
      users.push({
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: `password${i}`,
        profile: {
          bio: `This is the bio of user${i}`,
          profilePicUrl: `https://example.com/user${i}.jpg`
        },
        socialLinks: [
          { platform: 'Twitter', url: `https://twitter.com/user${i}` },
          { platform: 'LinkedIn', url: `https://linkedin.com/in/user${i}` }
        ]
      });
    }
    const createdUsers = await User.insertMany(users);


    // Create blogs
    const blogs = [];
    for (let i = 1; i <= 10; i++) {
      const numberOfLikes = Math.floor(Math.random() * createdUsers.length) + 1;
      const likes = [];
      const shuffledUsers = [...createdUsers].sort(() => 0.5 - Math.random());
      for (let j = 0; j < numberOfLikes; j++) {
        likes.push(shuffledUsers[j]._id);
      }
      blogs.push({
        title: `Blog ${i}`,
        content: `Content of blog ${i}`,
        authorId: createdUsers[i % createdUsers.length]._id,
        category: `Category ${i}`,
        image: `https://example.com/blog${i}.jpg`,
        likes: likes,
        comments: [{
          commentId: new mongoose.Types.ObjectId(),
          content: `This is a comment on blog ${i}`,
          authorId: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id,
          likes: [createdUsers[Math.floor(Math.random() * createdUsers.length)]._id]
        }]
      });
    }
    await Blog.insertMany(blogs);

    console.log('Test data generated successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error generating test data:', err);
    mongoose.connection.close();
  }
};

generateTestData();