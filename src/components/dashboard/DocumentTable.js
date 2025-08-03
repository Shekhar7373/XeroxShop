import React from 'react';
import { Download, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { api } from '../../services/api';

const groupByDate = (docs) => {
  return docs.reduce((acc, doc) => {
    const dateKey = format(new Date(doc.uploadDate), 'yyyy-MM-dd');
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(doc);
    return acc;
  }, {});
};

const DocumentTable = ({ documents, onStatusChange }) => {
  const groupedDocs = groupByDate(documents);

  const handleDownload = async (documentId, fileName) => {
    try {
      const response = await api.downloadDocument(documentId);
      window.open(response.downloadUrl, '_blank');
      toast.success(`Download started: ${fileName}`);
    } catch (error) {
      toast.error('Download failed');
    }
  };

  return (
    <div className="space-y-10">
      {Object.entries(groupedDocs).map(([date, docs]) => (
        <div key={date}>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            📁 {format(new Date(date), 'MMMM dd, yyyy')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {docs.map((doc) => (
              <div
                key={doc._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col justify-between"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {doc.fileName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {doc.customerName} • {doc.fileSize}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  {/* Status Checkbox */}
                  <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={doc.status === 'completed'}
                      onChange={() => onStatusChange(doc._id)}
                      className="form-checkbox h-4 w-4 text-green-600"
                    />
                    <span>{doc.status === 'completed' ? 'Printed' : 'Pending'}</span>
                  </label>

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(doc._id, doc.originalFileName || doc.fileName)}
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 text-sm"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentTable;
