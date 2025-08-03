import React, { useState } from 'react';
import { Upload, User, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { isValidFileType, formatFileSize } from '../../utils/helpers';

const DocumentUpload = ({ shopId, onUploadSuccess }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    purpose: '',
    file: null
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Document purpose is required';
    }

    if (!formData.file) {
      newErrors.file = 'Please select a file to upload';
    } else if (!isValidFileType(formData.file)) {
      newErrors.file = 'Please upload only PDF or DOC files';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (file) => {
    if (file && isValidFileType(file)) {
      setFormData({ ...formData, file });
      setErrors({ ...errors, file: '' });
    } else {
      toast.error('Please upload only PDF or DOC files');
      setErrors({ ...errors, file: 'Invalid file type' });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', formData.file);
      uploadFormData.append('customerName', formData.customerName);
      uploadFormData.append('purpose', formData.purpose);
      uploadFormData.append('shopId', shopId);

      await api.uploadDocument(uploadFormData, setUploadProgress);
      
      toast.success('Your documents are safely shared with XeroxShop.');
      
      // Reset form
      setFormData({ customerName: '', purpose: '', file: null });
      setUploadProgress(0);
      
      if (onUploadSuccess) {
        onUploadSuccess();
      }
      
    } catch (error) {
      toast.error('Upload failed. Please try again.');
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <Upload className="w-5 h-5 mr-2" />
        Document Upload
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <User className="inline w-4 h-4 mr-2" />
            Your Name *
          </label>
          <input
            type="text"
            value={formData.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
              errors.customerName ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Enter your full name"
            disabled={isUploading}
          />
          {errors.customerName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.customerName}
            </p>
          )}
        </div>

        {/* Document Purpose */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <FileText className="inline w-4 h-4 mr-2" />
            Document Purpose *
          </label>
          <input
            type="text"
            value={formData.purpose}
            onChange={(e) => handleInputChange('purpose', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
              errors.purpose ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="e.g., Job Application, Academic Submission"
            disabled={isUploading}
          />
          {errors.purpose && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.purpose}
            </p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Upload className="inline w-4 h-4 mr-2" />
            Upload Document *
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : errors.file
                ? 'border-red-300 dark:border-red-600'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange(e.target.files[0])}
              className="hidden"
              id="file-upload"
              disabled={isUploading}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              {formData.file ? (
                <div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {formData.file.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatFileSize(formData.file.size)}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    PDF, DOC, DOCX files only
                  </p>
                </div>
              )}
            </label>
          </div>
          {errors.file && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.file}
            </p>
          )}
        </div>

        {/* Upload Progress */}
        {uploadProgress > 0 && (
          <div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Upload Progress</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Uploading... ({uploadProgress}%)
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </>
          )}
        </button>
      </form>

      {/* Help Text */}
      <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
          Upload Guidelines:
        </h4>
        <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-1">
          <li>• Supported formats: PDF, DOC, DOCX</li>
          <li>• Maximum file size: 10MB</li>
          <li>• Ensure all information is accurate</li>
          <li>• Your documents are securely transmitted</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentUpload;