import axios from 'axios';
import { toast } from 'react-toastify';

// Create axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error details to the console
    if (error.response) {
      console.error('API Error:', {
        url: error.config?.url,
        status: error.response.status,
        data: error.response.data,
        method: error.config?.method,
        headers: error.config?.headers
      });
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Authentication
  login: async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (userData) => {
    try {
      const response = await API.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  getMe: async () => {
    try {
      const response = await API.get('/auth/me');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get user info');
    }
  },

  // Document operations
  uploadDocument: async (formData, onProgress) => {
    try {
      const response = await API.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(progress);
          }
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Upload failed');
    }
  },

  getDocuments: async (shopId, params = {}) => {
    try {
      const response = await API.get(`/documents/${shopId}`, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch documents');
    }
  },

  getDocument: async (documentId) => {
    try {
      const response = await API.get(`/documents/single/${documentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch document');
    }
  },

  updateDocumentStatus: async (documentId, status, notes) => {
    try {
      const response = await API.put(`/documents/${documentId}/status`, {
        status,
        notes,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update status');
    }
  },

  deleteDocument: async (documentId) => {
    try {
      const response = await API.delete(`/documents/${documentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete document');
    }
  },

  downloadDocument: async (documentId) => {
    try {
      const response = await API.get(`/documents/${documentId}/download`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Download failed');
    }
  },

  getDashboardStats: async (shopId) => {
    try {
      const response = await API.get(`/documents/${shopId}/stats`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch stats');
    }
  },

  searchDocuments: async (shopId, query, status) => {
    try {
      const params = {};
      if (query) params.query = query;
      if (status && status !== 'all') params.status = status;
      
      const response = await API.get(`/documents/search/${shopId}`, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Search failed');
    }
  },

  // Shop operations
  getShopByCode: async (shopCode) => {
    try {
      const response = await API.get(`/shops/code/${shopCode}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Shop not found');
    }
  },

  getShop: async (shopId) => {
    try {
      const response = await API.get(`/shops/${shopId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch shop');
    }
  },
};

// Helper function to handle API errors
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.message) {
    toast.error(error.message);
  } else {
    toast.error('An unexpected error occurred');
  }
};