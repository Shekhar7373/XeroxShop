import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ownerAPI } from '../services/api';
import DocumentList from './DocumentList';
import QRGenerator from './QRGenerator';

const Dashboard = () => {
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentDocs, setRecentDocs] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ownerData = localStorage.getItem('owner');
    if (ownerData) {
      setOwner(JSON.parse(ownerData));
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await ownerAPI.getDashboard();
      setStats(response.data.stats);
      setRecentDocs(response.data.recentDocuments);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('owner');
    navigate('/login');
  };

  const StatCard = ({ title, value, color, icon }) => (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
      <h3 style={{ color, fontSize: '32px', margin: '8px 0' }}>{value}</h3>
      <p style={{ color: '#6b7280', fontSize: '14px' }}>{title}</p>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ color: '#1f2937', marginBottom: '4px' }}>
              🏪 {owner?.shopName}
            </h1>
            <p style={{ color: '#6b7280' }}>Shop ID: {owner?.shopId}</p>
          </div>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="card">
        <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #e5e7eb' }}>
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'documents', label: 'Documents', icon: '📄' },
            { id: 'qr-code', label: 'QR Code', icon: '📱' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 16px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : 'none',
                color: activeTab === tab.id ? '#3b82f6' : '#6b7280'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-4">
            <StatCard 
              title="Total Documents" 
              value={stats?.total || 0} 
              color="#3b82f6" 
              icon="📄"
            />
            <StatCard 
              title="Pending" 
              value={stats?.pending || 0} 
              color="#f59e0b" 
              icon="⏳"
            />
            <StatCard 
              title="Ready" 
              value={stats?.ready || 0} 
              color="#10b981" 
              icon="✅"
            />
            <StatCard 
              title="Downloaded" 
              value={stats?.downloaded || 0} 
              color="#6b7280" 
              icon="📥"
            />
          </div>

          {/* Recent Documents */}
          <div className="card">
            <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>
              📋 Recent Documents
            </h3>
            {recentDocs.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Upload Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDocs.map(doc => (
                    <tr key={doc._id}>
                      <td>{doc.fileName}</td>
                      <td>{doc.customerName}</td>
                      <td>
                        <span 
                          className="status-badge"
                          style={{ 
                            backgroundColor: doc.status === 'pending' ? '#fef3c7' : 
                                           doc.status === 'ready' ? '#d1fae5' : '#f3f4f6',
                            color: doc.status === 'pending' ? '#d97706' : 
                                   doc.status === 'ready' ? '#065f46' : '#374151'
                          }}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
                No documents uploaded yet
              </p>
            )}
          </div>
        </>
      )}

      {activeTab === 'documents' && <DocumentList />}
      {activeTab === 'qr-code' && <QRGenerator owner={owner} />}
    </div>
  );
};

export default Dashboard;