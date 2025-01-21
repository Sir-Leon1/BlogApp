const express = require('express');
const { uploadTagImage, getTagById, getAllTags } = require('../controllers/tagControllers');
const router = express.Router();

router.post('/tags/upload', uploadTagImage);
router.get('/tags/:id', getTagById);
router.get('/tags', getAllTags);

module.exports = router;