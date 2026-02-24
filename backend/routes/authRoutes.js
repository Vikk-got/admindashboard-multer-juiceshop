const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Admin login with JWT token
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists - try both username and email
    let user = await User.findOne({ username }).select('+password');
    
    // If not found by username, try email
    if (!user) {
      user = await User.findOne({ email: username }).select('+password');
    }
    
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: user.getSignedJwtToken(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current admin user
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'krishna_juice_secret_key');
    const user = await User.findById(decoded.id);
    
    if (!user || user.role !== 'admin') {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
