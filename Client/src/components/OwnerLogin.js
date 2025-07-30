import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ownerAPI } from '../services/api';

const OwnerLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    shopName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = isLogin 
        ? await ownerAPI.login(formData)
        : await ownerAPI.register(formData);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('owner', JSON.stringify(response.data.owner));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '400px', margin: '100px auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#1f2937', marginBottom: '8px' }}>
            🏪 Xerox Shop Owner
          </h1>
          <p style={{ color: '#6b7280' }}>
            {isLogin ? 'Sign in to your account' : 'Create your shop account'}
          </p>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              minLength="6"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Shop Name</label>
              <input
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%', marginBottom: '16px' }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#3b82f6', 
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isLogin 
              ? "Don't have an account? Register" 
              : "Already have an account? Login"
            }
          </button>
        </div>

        {!isLogin && (
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            backgroundColor: '#eff6ff', 
            borderRadius: '6px',
            fontSize: '14px',
            color: '#1e40af'
          }}>
            <strong>After registration, you'll get:</strong>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              <li>Unique shop ID and QR code</li>
              <li>Customer upload link</li>
              <li>Document management dashboard</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerLogin;