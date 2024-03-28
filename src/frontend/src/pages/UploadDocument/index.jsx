import React, { useState } from 'react';
import { Upload, Button } from 'antd';
import DocumentDetailsModal from '@/components/Document/DocumentDetailsModal';
import { API_BASE_URL } from '@/constants';

const UploadDocument = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleUpload = async (info) => {
    if (info.file.status === 'done') {
      setUploading(false);
      const response = info.file.response;
      if (response) {
        setUploadedDocument(response);
        setIsVisible(true);
      }
      else {
        console.error('Upload failed with response:', response);
        console.error('Upload failed with info:', info.file.response.message);
      }
    }
    else if (info.file.status === 'uploading') {
      setUploading(true);
    }
    else if (info.file.status === 'error') {
      setUploading(false);
      console.error('Upload error:', info.file.response);
    }
  };

  const handleCancelModal = () => {
    setIsVisible(false);
  };

  return (
    <>
      <Upload
        name="file"
        action={`${API_BASE_URL}/upload`}
        beforeUpload={(file) => {
          // You might want to include an accept attribute in the Upload component to restrict file types
          // based on the API requirements. For example:
          // accept=".pdf, .doc, .docx, .xls, .xlsx, .txt"
          return true;
        }}
        onChange={handleUpload}
        showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
        disabled={uploading}
      >
        <Button type="primary" loading={uploading}>
          上传文档
        </Button>
      </Upload>

      {uploadedDocument && (
        <DocumentDetailsModal
          isOpen={isVisible}
          document={uploadedDocument}
          onCancel={handleCancelModal}
        />
      )}
    </>
  );
};

export default UploadDocument;