import React, { useState, useEffect } from 'react';
import { Eye, FileText, Download, AlertCircle } from 'lucide-react';

const DocumentPreview = ({ file }) => {
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewError, setPreviewError] = useState('');

  useEffect(() => {
    if (file && file.type === 'application/pdf') {
      try {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setPreviewError('');
        
        // Cleanup function
        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (error) {
        setPreviewError('Failed to load preview');
      }
    } else if (file) {
      setPreviewError('Preview not available for this file type');
    } else {
      setPreviewUrl('');
      setPreviewError('');
    }
  }, [file]);

  const handleDownload = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Document Preview
        </h2>
        
        {file && (
          <button
            onClick={handleDownload}
            className="flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </button>
        )}
      </div>
      
      {file ? (
        <div className="space-y-4">
          {/* File Info */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {file.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type}
                </p>
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700">
            {previewError ? (
              <div className="h-96 flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <AlertCircle className="mx-auto h-12 w-12 mb-4" />
                  <p className="font-medium">{previewError}</p>
                  <p className="text-sm mt-2">
                    {file.type.includes('pdf') 
                      ? 'Try downloading the file to view it'
                      : 'Document preview is only available for PDF files'
                    }
                  </p>
                </div>
              </div>
            ) : previewUrl ? (
              <iframe
                src={previewUrl}
                className="w-full h-96"
                title="Document Preview"
                style={{ minHeight: '400px' }}
              />
            ) : (
              <div className="h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>

          {/* Preview Controls */}
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <span>
              {file.type === 'application/pdf' 
                ? 'PDF preview shown above'
                : 'File ready for upload'
              }
            </span>
            <span>
              Last modified: {new Date(file.lastModified).toLocaleDateString()}
            </span>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-96 flex items-center justify-center">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <Eye className="mx-auto h-12 w-12 mb-4" />
            <p className="font-medium">No Document Selected</p>
            <p className="text-sm mt-2">
              Upload a PDF file to see preview here
            </p>
          </div>
        </div>
      )}

      {/* Preview Tips */}
      {file && file.type === 'application/pdf' && !previewError && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
          <h4 className="text-sm font-medium text-green-900 dark:text-green-200 mb-1">
            Preview Tips:
          </h4>
          <ul className="text-xs text-green-800 dark:text-green-300 space-y-1">
            <li>• Preview may take a moment to load</li>
            <li>• Ensure document content is correct before uploading</li>
            <li>• Some PDF features may not display in preview</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentPreview;