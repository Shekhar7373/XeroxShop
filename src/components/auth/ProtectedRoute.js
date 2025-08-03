import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FullPageLoader } from '../common/LoadingSpinner';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return <FullPageLoader text="Checking authentication..." />;
  }

  if (requireAuth && !isAuthenticated()) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated()) {
    // If user is authenticated and tries to access login page, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;