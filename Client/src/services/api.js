import axios from 'axios';

// Auto-detect API URL based on environment
const getApiUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return '/api';
  }
  return process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
};

const API_URL = getApiUrl();
console.log('🌐 API: Base URL configured as:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('🔑 API: Added auth token to request:', config.url);
  }
  console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('📥 API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('💥 API Error:', error.response?.status, error.config?.url, error.message);
    if (error.response?.status === 401) {
      console.log('🚫 API: Unauthorized - redirecting to login');
      localStorage.removeItem('token');
      localStorage.removeItem('owner');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const ownerAPI = {
  login: (credentials) => {
    console.log('👤 OwnerAPI: Attempting login for user:', credentials.username);
    return api.post('/owner/login', credentials);
  },
  register: (data) => {
    console.log('📝 OwnerAPI: Registering new shop:', data.shopName);
    return api.post('/owner/register', data);
  },
  getDashboard: () => {
    console.log('📊 OwnerAPI: Fetching dashboard data');
    return api.get('/owner/dashboard');
  },
};

export const documentAPI = {
  getAll: (params) => {
    console.log('📄 DocumentAPI: Fetching documents with params:', params);
    return api.get('/documents', { params });
  },
  getOne: (id) => {
    console.log('📄 DocumentAPI: Fetching single document:', id);
    return api.get(`/documents/${id}`);
  },
  updateStatus: (id, status) => {
    console.log('🔄 DocumentAPI: Updating document status:', id, 'to', status);
    return api.patch(`/documents/${id}/status`, { status });
  },
  delete: (id) => {
    console.log('🗑️ DocumentAPI: Deleting document:', id);
    return api.delete(`/documents/${id}`);
  },
};

export const uploadAPI = {
  validateShop: (shopId) => {
    console.log('🏪 UploadAPI: Validating shop ID:', shopId);
    return api.get(`/upload/validate/${shopId}`);
  },
  uploadDocument: (shopId, formData) => {
    console.log('📤 UploadAPI: Uploading document to shop:', shopId);
    return api.post(`/upload/${shopId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000,
    });
  },
};

export default api;