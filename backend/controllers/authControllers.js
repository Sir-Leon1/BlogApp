//Auth controllers
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try{
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'User already exists' });

    const user = new User({ username, email, password });
    await user.save();
    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ access_token: accessToken, refresh_token: refreshToken });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'An unexpected error occured' });
  }
}


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ access_token: accessToken, refresh_token: refreshToken });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

module.exports = { register, login };