import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('🌟 Starting Digital Xerox Shop Application...');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('✅ React application rendered successfully');