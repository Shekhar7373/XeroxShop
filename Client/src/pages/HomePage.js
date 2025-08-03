import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, FileText, CheckCircle, Shield, Clock, Users } from 'lucide-react';
import ThemeToggle from '../components/layout/ThemeToggle';
import QRCodeDisplay from '../components/common/QRCodeDisplay';

const HomePage = () => {
  const features = [
    {
      icon: Upload,
      title: 'Easy Upload',
      description: 'Simple drag-and-drop interface for document uploads',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Secure Sharing',
      description: 'End-to-end secure document transmission',
      color: 'green'
    },
    {
      icon: Clock,
      title: 'Real-time Progress',
      description: 'Live upload progress and instant confirmations',
      color: 'purple'
    },
    {
      icon: Users,
      title: 'Customer Management',
      description: 'Organized document management by customer',
      color: 'orange'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
      green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
      purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
      orange: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <div></div>
          <ThemeToggle />
        </div>
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Xerox<span className="text-blue-600">Shop</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Seamless document sharing between customers and xerox shops. 
            Upload, manage, and track documents with ease.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Shop Owner Login
            </Link>
            <Link
              to="/shop/demo"
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-4 px-8 rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Try Customer Interface
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">100+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Shops</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-400">Documents Shared</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400">Uptime</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${getColorClasses(feature.color)}`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Two Column Feature Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* For Customers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">For Customers</h3>
            </div>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Easy document upload via QR code or URL</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>PDF preview before submission</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Real-time upload progress tracking</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Secure document sharing</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Mobile-friendly interface</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                to="/shop/demo"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                Try Upload Interface
              </Link>
            </div>
          </div>

          {/* For Shop Owners */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">For Shop Owners</h3>
            </div>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Centralized document management dashboard</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Advanced search and filter capabilities</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Customer-wise document grouping</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Download and preview functionality</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Real-time notifications and analytics</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                to="/login"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <FileText className="w-4 h-4 mr-2" />
                Access Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Get Started Today
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Share your shop's unique URL or QR code with customers for instant document uploads
            </p>
          </div>
          <div className="max-w-lg mx-auto">
            <QRCodeDisplay shopId="demo" />
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Share Your Link
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Give customers your unique shop URL or QR code
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Customer Uploads
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Customers upload documents with their details
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Manage & Process
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                View, download, and manage all documents from your dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            © 2024 XeroxShop. Built with React and Tailwind CSS.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;