const express = require('express');
const { upload } = require('../config/cloudinary');
const Document = require('../models/Document');
const Owner = require('../models/Owner');

const router = express.Router();

// Validate shop ID
router.get('/validate/:shopId', async (req, res) => {
  try {
    const owner = await Owner.findOne({ shopId: req.params.shopId });
    if (!owner) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    
    res.json({ 
      valid: true, 
      shopName: owner.shopName 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload document
router.post('/:shopId', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const { customerName, customerPhone, copies, instructions } = req.body;
    const { shopId } = req.params;
    
    // Validate shop exists
    const owner = await Owner.findOne({ shopId });
    if (!owner) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    
    const document = new Document({
      fileName: req.file.filename,
      originalName: req.file.originalname,
      fileUrl: req.file.path,
      cloudinaryId: req.file.filename,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      customerName,
      customerPhone,
      shopId,
      copies: copies || 1,
      instructions: instructions || ''
    });
    
    await document.save();
    
    res.status(201).json({
      message: 'Document uploaded successfully',
      document: {
        id: document._id,
        originalName: document.originalName,
        status: document.status,
        createdAt: document.createdAt
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;