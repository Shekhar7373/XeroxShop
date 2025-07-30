import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { uploadAPI } from '../services/api';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../utils/constants';

const CustomerUpload = () => {
  const { shopId } = useParams();
  const [shopInfo, setShopInfo] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    copies: 1,
    instructions: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('🏪 CustomerUpload: Component mounted for shop:', shopId);
    validateShop();
  }, [shopId]);

  const validateShop = async () => {
    try {
      const response = await uploadAPI.validateShop(shopId);
      setShopInfo(response.data);
      console.log('✅ CustomerUpload: Shop validation successful');
    } catch (err) {
      console.error('❌ CustomerUpload: Shop validation failed:', err);
      setError('Invalid shop ID or shop not found');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
        setError('Invalid file type. Only PDF, DOC, DOCX, and images are allowed.');
        return;
      }
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError('File size too large. Maximum size is 10MB.');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📤 CustomerUpload: Starting document upload...');

    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const uploadData = new FormData();
      uploadData.append('document', file);
      uploadData.append('customerName', formData.customerName);
      uploadData.append('customerPhone', formData.customerPhone);
      uploadData.append('copies', formData.copies);
      uploadData.append('instructions', formData.instructions);

      await uploadAPI.uploadDocument(shopId, uploadData);

      console.log('✅ CustomerUpload: Document uploaded successfully');
      setMessage('Document uploaded successfully! You will be notified when it\'s ready.');
      setFormData({
        customerName: '',
        customerPhone: '',
        copies: 1,
        instructions: ''
      });
      setFile(null);
      document.getElementById('fileInput').value = '';
    } catch (err) {
      console.error('❌ CustomerUpload: Upload failed:', err);
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (error && !shopInfo) {
    return (
      <div className="container">
        <div className="card" style={{ maxWidth: '400px', margin: '100px auto' }}>
          <h2 style={{ color: '#dc2626', textAlign: 'center' }}>Shop Not Found</h2>
          <p style={{ textAlign: 'center', color: '#6b7280' }}>
            The shop ID is invalid or the shop doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '20px auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#1f2937', marginBottom: '8px' }}>
            📄 {shopInfo?.shopName || 'Digital Xerox'}
          </h1>
          <p style={{ color: '#6b7280' }}>Upload your documents for printing</p>
        </div>

        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Your Name *</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Document *</label>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="form-input"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              required
            />
            <small style={{ color: '#6b7280' }}>
              Supported: PDF, DOC, DOCX, JPG, PNG (Max: 10MB)
            </small>
          </div>

          <div className="form-group">
            <label className="form-label">Number of Copies</label>
            <input
              type="number"
              name="copies"
              value={formData.copies}
              onChange={handleInputChange}
              className="form-input"
              min="1"
              max="100"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Special Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              className="form-textarea"
              rows="3"
              placeholder="Any special printing instructions..."
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Uploading...' : 'Upload Document'}
          </button>
        </form>

        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '6px' }}>
          <h4 style={{ color: '#166534', marginBottom: '8px' }}>📋 How it works:</h4>
          <ol style={{ color: '#166534', fontSize: '14px', paddingLeft: '20px' }}>
            <li>Upload your document with your details</li>
            <li>We'll process and print your document</li>
            <li>You'll be notified when it's ready for pickup</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default CustomerUpload;
