import React from 'react';
import { Modal } from 'antd';
import DocumentDetailsModal from '@/components/Document/DocumentDetailsModal';

const UploadResultModal = ({ visible, uploadResult, onCancel }) => {
  const { document, ocrText, category } = uploadResult;

  return (
    <Modal
      visible={visible}
      title="上传结果"
      footer={null}
      onCancel={onCancel}
      width={800}
    >
      <div>
        <p>
          <strong>OCR识别结果:</strong>
        </p>
        <pre>{ocrText}</pre>
        <p>
          <strong>自动分类结果:</strong>
        </p>
        <div>{category}</div>
        <DocumentDetailsModal
          visible={true}
          document={document}
          onCancel={onCancel}
        />
      </div>
    </Modal>
  );
};

export default UploadResultModal;