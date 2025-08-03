import React, { useState } from "react";
import DocumentUpload from "./DocumentUpload";
import DocumentPreview from "./DocumentPreview";
import { CheckCircle } from "lucide-react";
import QRCodeDisplay from "../common/QRCodeDisplay";
import { useParams } from "react-router-dom";

const CustomerInterface = () => {
  const { shopCode } = useParams(); // ✅ Updated from shopId to shopCode
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUploadSuccess = () => {
    setUploadSuccess(true);
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Upload Your Documents
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Share your files securely with the Xerox shop. You can preview your
            PDF and track the upload in real time.
          </p>
        </div>

        {/* Upload Section */}
        {!uploadSuccess && (
          <DocumentUpload
            shopId={shopCode} // ✅ Passed shopCode as shopId prop
            onUploadSuccess={handleUploadSuccess}
          />
        )}

        {/* Preview Section */}
        {!uploadSuccess && uploadedFile && (
          <DocumentPreview file={uploadedFile} />
        )}

        {/* Success Message */}
        {uploadSuccess && (
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-6 text-center">
            <CheckCircle className="w-12 h-12 mx-auto text-green-600 dark:text-green-400 mb-4" />
            <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-2">
              Upload Successful!
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Your document has been shared with the Xerox Shop. You may close
              this tab or upload another file.
            </p>
          </div>
        )}

        {/* Optional QR Code (shop identity) */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Upload More Documents Later
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Scan or bookmark this QR code to return to the same shop later.
          </p>
          <div className="flex justify-center">
            <QRCodeDisplay shopId={shopCode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInterface;
