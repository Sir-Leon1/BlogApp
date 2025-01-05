// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const tagRoutes = require('./routes/tagRoutes');

dotenv.config();

const app = express();
connectDB().then(r => console.log('Connected to MongoDB'));

// Middleware
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Test server is running!' });
});

// Example: app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/auth', authRoutes);
app.use('/api/b', blogRoutes);
app.use('/api/t', tagRoutes);


app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'An unexpected error occured' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
