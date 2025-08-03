import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const Header = ({ title = 'XeroxShop Dashboard', showLogout = true }) => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
            {user && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Welcome back, {user.email}
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {showLogout && user && (
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;