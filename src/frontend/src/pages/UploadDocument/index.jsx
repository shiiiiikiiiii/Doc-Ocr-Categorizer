import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import UploadResultModal from '@/components/Document/UploadResultModal';
import { upload_document_image } from '@/services/api';

const UploadDocument = () => {
  const [uploadResult, setUploadResult] = useState(null);

  const handleUpload = async (file) => {
    try {
      const result = await upload_document_image(file);
      setUploadResult(result);
    } catch (error) {
      console.error('Error uploading document:', error);
      message.error('上传文档失败');
    }
  };

  const handleCloseModal = () => {
    setUploadResult(null);
  };

  return (
    <div>
      <Upload.Dragger
        name="file"
        multiple={false}
        showUploadList={false}
        customRequest={handleUpload}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽文档到此区域进行上传</p>
        <p className="ant-upload-hint">仅支持单个文档上传</p>
      </Upload.Dragger>
      {uploadResult && (
        <UploadResultModal
          visible={true}
          uploadResult={uploadResult}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UploadDocument;