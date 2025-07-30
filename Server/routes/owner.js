const express = require('express');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const Owner = require('../models/Owner');
const Document = require('../models/Document');
const auth = require('../middleware/auth');

const router = express.Router();

// Register owner (for initial setup)
router.post('/register', async (req, res) => {
  try {
    console.log('📝 Owner: Registration attempt for shop:', req.body.shopName);

    const { username, password, shopName } = req.body;
    
    // Generate unique shop ID
    const shopId = Math.random().toString(36).substr(2, 9);
    console.log('🆔 Owner: Generated shop ID:', shopId);
    
    // Generate QR code for customer access
    const customerUrl = `${process.env.CLIENT_URL}/upload/${shopId}`;
    const qrCode = await QRCode.toDataURL(customerUrl);
    
    const owner = new Owner({
      username,
      password,
      shopName,
      shopId,
      qrCode
    });
    
    await owner.save();
    
    const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET);
    
    console.log('✅ Owner: Registration successful for shop:', shopName);
    res.status(201).json({
      token,
      owner: {
        id: owner._id,
        username: owner.username,
        shopName: owner.shopName,
        shopId: owner.shopId,
        qrCode: owner.qrCode
      }
    });
  } catch (error) {
    console.error('❌ Owner: Registration failed:', error.message);
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    console.log('👤 Owner: Login attempt for user:', req.body.username);

    const { username, password } = req.body;
    
    const owner = await Owner.findOne({ username });
    if (!owner || !(await owner.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET);
    
    console.log('✅ Owner: Login successful for user:', req.body.username);
    res.json({
      token,
      owner: {
        id: owner._id,
        username: owner.username,
        shopName: owner.shopName,
        shopId: owner.shopId,
        qrCode: owner.qrCode
      }
    });
  } catch (error) {
    console.error('❌ Owner: Login failed:', error.message);
    res.status(400).json({ message: error.message });
  }
});

// Get dashboard stats
router.get('/dashboard', auth, async (req, res) => {
  try {
    console.log('📊 Owner: Dashboard data requested for shop:', req.owner.shopId);

    const shopId = req.owner.shopId;
    
    const totalDocs = await Document.countDocuments({ shopId });
    const pendingDocs = await Document.countDocuments({ shopId, status: 'pending' });
    const readyDocs = await Document.countDocuments({ shopId, status: 'ready' });
    const downloadedDocs = await Document.countDocuments({ shopId, status: 'downloaded' });
    
    const recentDocs = await Document.find({ shopId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fileName customerName status createdAt');
    
    const stats = {
      total: totalDocs,
      pending: pendingDocs,
      ready: readyDocs,
      downloaded: downloadedDocs
    };

    console.log('✅ Owner: Dashboard data sent successfully');
    res.json({
      stats,
      recentDocuments: recentDocs
    });
  } catch (error) {
    console.error('❌ Owner: Dashboard fetch failed:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
