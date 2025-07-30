import React, { useState } from 'react';

const QRGenerator = ({ owner }) => {
  const [copied, setCopied] = useState(false);
  
  const customerUrl = `${window.location.origin}/upload/${owner?.shopId}`;

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadQR = () => {
    if (!owner?.qrCode) return;
    
    const link = document.createElement('a');
    link.download = `${owner.shopName}-QR-Code.png`;
    link.href = owner.qrCode;
    link.click();
  };

  const printQR = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>QR Code - ${owner?.shopName}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 40px;
            }
            .qr-container {
              max-width: 400px;
              margin: 0 auto;
              border: 2px solid #000;
              padding: 20px;
              border-radius: 10px;
            }
            h1 { color: #333; margin-bottom: 20px; }
            img { max-width: 300px; height: auto; }
            .instructions {
              margin-top: 20px;
              font-size: 14px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <h1>📄 ${owner?.shopName}</h1>
            <p><strong>Scan to Upload Documents</strong></p>
            <img src="${owner?.qrCode}" alt="QR Code" />
            <div class="instructions">
              <p>1. Scan this QR code with your phone</p>
              <p>2. Upload your documents</p>
              <p>3. We'll notify you when ready!</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px;">
              Shop ID: ${owner?.shopId}
            </p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="card">
      <h3 style={{ color: '#1f2937', marginBottom: '20px' }}>
        📱 Customer Access QR Code
      </h3>
      
      <div className="grid grid-2">
        {/* QR Code Display */}
        <div style={{ textAlign: 'center' }}>
          {owner?.qrCode ? (
            <div>
              <div style={{ 
                padding: '20px', 
                backgroundColor: 'white', 
                border: '2px solid #e5e7eb', 
                borderRadius: '8px',
                display: 'inline-block'
              }}>
                <img 
                  src={owner.qrCode} 
                  alt="Shop QR Code" 
                  style={{ maxWidth: '200px', height: 'auto' }}
                />
              </div>
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={downloadQR} className="btn btn-primary">
                  📥 Download
                </button>
                <button onClick={printQR} className="btn btn-success">
                  🖨️ Print
                </button>
              </div>
            </div>
          ) : (
            <div style={{ padding: '40px', color: '#6b7280' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📱</div>
              <p>QR Code not available</p>
            </div>
          )}
        </div>

        {/* Instructions and URL */}
        <div>
          <h4 style={{ color: '#1f2937', marginBottom: '16px' }}>How to use:</h4>
          <ol style={{ color: '#374151', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>Print or display this QR code in your shop</li>
            <li>Customers scan the code with their phones</li>
            <li>They'll be directed to upload their documents</li>
            <li>You'll see all uploads in your dashboard</li>
          </ol>

          <div style={{ marginTop: '24px' }}>
            <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>Direct Link:</h4>
            <div style={{ 
              backgroundColor: '#f9fafb', 
              padding: '12px', 
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              fontSize: '14px',
              wordBreak: 'break-all'
            }}>
              {customerUrl}
            </div>
            <button
              onClick={() => copyToClipboard(customerUrl)}
              className="btn btn-primary"
              style={{ marginTop: '8px', fontSize: '12px' }}
            >
              {copied ? '✅ Copied!' : '📋 Copy Link'}
            </button>
          </div>

          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            backgroundColor: '#eff6ff', 
            borderRadius: '6px',
            border: '1px solid #bfdbfe'
          }}>
            <h4 style={{ color: '#1e40af', marginBottom: '8px' }}>💡 Pro Tips:</h4>
            <ul style={{ color: '#1e40af', fontSize: '14px', paddingLeft: '16px' }}>
              <li>Place the QR code where customers can easily see it</li>
              <li>Consider printing multiple copies for different locations</li>
              <li>Include your shop name and instructions near the QR code</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sample Poster Template */}
      <div style={{ marginTop: '32px' }}>
        <h4 style={{ color: '#1f2937', marginBottom: '16px' }}>📋 Sample Poster Layout:</h4>
        <div style={{ 
          border: '2px dashed #d1d5db', 
          padding: '24px', 
          borderRadius: '8px',
          backgroundColor: '#fafafa',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#1f2937', marginBottom: '8px' }}>
            📄 {owner?.shopName}
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '16px' }}>
            Upload Your Documents Digitally
          </p>
          
          <div style={{ 
            width: '150px', 
            height: '150px', 
            border: '1px solid #d1d5db',
            margin: '16px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white'
          }}>
            QR CODE HERE
          </div>
          
          <div style={{ color: '#374151', fontSize: '14px' }}>
            <p><strong>How it works:</strong></p>
            <p>1. Scan QR code → 2. Upload documents → 3. Get notified!</p>
          </div>
        </div>
        
        <p style={{ 
          color: '#6b7280', 
          fontSize: '12px', 
          marginTop: '8px',
          fontStyle: 'italic'
        }}>
          This is a preview of how you can arrange your poster. Print the QR code and create a similar layout.
        </p>
      </div>
    </div>
  );
};

export default QRGenerator;