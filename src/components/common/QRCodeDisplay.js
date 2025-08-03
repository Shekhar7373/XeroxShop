import React, { useState } from 'react';
import { Copy, Check, QrCode, ExternalLink } from 'lucide-react';
import { generateShopUrl, copyToClipboard } from '../../utils/helpers';
import { toast } from 'react-toastify';

const QRCodeDisplay = ({ shopId }) => {
  const [copied, setCopied] = useState(false);
  const url = generateShopUrl(shopId);

  const handleCopyUrl = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      toast.success('URL copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy URL');
    }
  };

  const handleOpenUrl = () => {
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="text-center mb-6">
        <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <QrCode className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Customer Access Portal
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Share this URL with customers to upload documents
        </p>
      </div>

      {/* URL Display */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
          Customer Upload URL:
        </label>
        <div className="flex items-center space-x-2">
          <code className="flex-1 text-sm text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 px-3 py-2 rounded border break-all">
            {url}
          </code>
          <button
            onClick={handleCopyUrl}
            className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            title="Copy URL"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleOpenUrl}
            className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleCopyUrl}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy URL
        </button>
        
        <button
          onClick={handleOpenUrl}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Test Upload
        </button>
      </div>

      {/* QR Code Placeholder */}
      <div className="mt-6 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
        <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          QR Code would be generated here
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          (Integrate with a QR code library for production)
        </p>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
          How to use:
        </h4>
        <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-1">
          <li>• Share the URL or QR code with customers</li>
          <li>• Customers can upload documents directly</li>
          <li>• View all uploads in your dashboard</li>
          <li>• Download or preview documents as needed</li>
        </ul>
      </div>
    </div>
  );
};

export default QRCodeDisplay;