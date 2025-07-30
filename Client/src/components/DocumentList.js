import React, { useState, useEffect } from 'react';
import { documentAPI } from '../services/api';
import { STATUS_COLORS } from '../utils/constants';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    console.log('📄 DocumentList: Component mounted, fetching documents...');
    fetchDocuments();
  }, [filter]);

  const fetchDocuments = async () => {
    try {
      console.log('📡 DocumentList: Fetching documents with filter:', filter);
      setLoading(true);
      const response = await documentAPI.getAll({ status: filter, limit: 20 });
      console.log('✅ DocumentList: Documents fetched successfully:', response.data.documents.length, 'documents');
      setDocuments(response.data.documents);
    } catch (error) {
      console.error('❌ DocumentList: Failed to fetch documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (docId, newStatus) => {
    try {
      console.log('🔄 DocumentList: Updating document status:', docId, 'to', newStatus);
      await documentAPI.updateStatus(docId, newStatus);
      console.log('✅ DocumentList: Status updated successfully');
      fetchDocuments();
    } catch (error) {
      console.error('❌ DocumentList: Failed to update status:', error);
    }
  };

  const handleDelete = async (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        console.log('🗑️ DocumentList: Deleting document:', docId);
        await documentAPI.delete(docId);
        console.log('✅ DocumentList: Document deleted successfully');
        fetchDocuments();
      } catch (error) {
        console.error('❌ DocumentList: Failed to delete document:', error);
      }
    }
  };

  if (loading) return <div className="loading">Loading documents...</div>;

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>📄 All Documents ({documents.length})</h3>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-select">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="ready">Ready</option>
          <option value="downloaded">Downloaded</option>
        </select>
      </div>

      {documents.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(doc => (
              <tr key={doc._id}>
                <td>{doc.originalName}</td>
                <td>{doc.customerName}</td>
                <td>{doc.customerPhone}</td>
                <td>
                  <select 
                    value={doc.status} 
                    onChange={(e) => handleStatusUpdate(doc._id, e.target.value)}
                    style={{ 
                      backgroundColor: STATUS_COLORS[doc.status] || '#gray',
                      color: 'white',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="ready">Ready</option>
                    <option value="downloaded">Downloaded</option>
                  </select>
                </td>
                <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => window.open(doc.fileUrl, '_blank')}
                    className="btn btn-primary"
                    style={{ marginRight: '8px', fontSize: '12px', padding: '4px 8px' }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="btn btn-danger"
                    style={{ fontSize: '12px', padding: '4px 8px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>
          No documents found
        </p>
      )}
    </div>
  );
};

export default DocumentList;