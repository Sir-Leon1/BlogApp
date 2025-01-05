//Create auth routes
const express = require('express');
const { register, login, logout } = require('../controllers/authControllers');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);

module.exports = router;