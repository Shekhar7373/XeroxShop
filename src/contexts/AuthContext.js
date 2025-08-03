import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        try {
          const response = await api.getMe();
          setUser(response.user);
        } catch (error) {
          // Token is invalid, remove it
          localStorage.removeItem('authToken');
          localStorage.removeItem('userInfo');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.login(email, password);
      
      setUser(response.user);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userInfo', JSON.stringify(response.user));
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.register(userData);
      
      setUser(response.user);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userInfo', JSON.stringify(response.user));
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
  };

  const isAuthenticated = () => {
    return user !== null && localStorage.getItem('authToken');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};