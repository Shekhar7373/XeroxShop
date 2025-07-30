import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomerUpload from './components/CustomerUpload';
import OwnerLogin from './components/OwnerLogin';
import Dashboard from './components/Dashboard';
import './App.css';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log('🔐 PrivateRoute: Checking authentication, token exists:', !!token);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  console.log('🚀 App: Application starting...');
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<OwnerLogin />} />
          <Route path="/upload/:shopId" element={<CustomerUpload />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;