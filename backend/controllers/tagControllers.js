const Tag = require('../models/Tag');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadTagImage = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Image upload failed' });
    }
    const { name } = req.body;
    const imageData = req.file.buffer;
    const imageContentType = req.file.mimetype;

    try {
      const tag = new Tag({ name, imageData, imageContentType });
      await tag.save();
      res.status(201).json(tag);
    } catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  });
};

const getTagById = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findById(id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.status(200).json({
      id: tag._id,
      name: tag.name,
      image: `data:${tag.imageContentType};base64,${tag.imageData.toString('base64')}`
    });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find({});
    res.status(200).json(tags.map(tag => ({
      id: tag._id,
      name: tag.name,
      image: `data:${tag.imageContentType};base64,${tag.imageData.toString('base64')}`
    })));
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

module.exports = { uploadTagImage, getTagById, getAllTags };