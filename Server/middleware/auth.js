const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = await Owner.findById(decoded.id).select('-password');
    
    if (!owner) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.owner = owner;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = auth;