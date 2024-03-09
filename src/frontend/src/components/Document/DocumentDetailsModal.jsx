import React, { useState } from 'react';
import { Modal, Button, Tag } from 'antd';
import UpdateCategoryForm from '@/components/Document/UpdateCategoryForm';

const DocumentDetailsModal = ({ visible, document, onCancel }) => {
  const [showUpdateCategoryForm, setShowUpdateCategoryForm] = useState(false);

  const handleUpdateCategory = () => {
    setShowUpdateCategoryForm(true);
  };

  const handleCancelUpdateCategory = () => {
    setShowUpdateCategoryForm(false);
  };

  const handleUpdateCategorySuccess = (updatedCategory) => {
    // Update document category
    setShowUpdateCategoryForm(false);
  };

  return (
    <Modal
      visible={visible}
      title={document?.name}
      footer={null}
      onCancel={onCancel}
      width={800}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: 16 }}>
          <img src={document?.imageUrl} alt={document?.name} style={{ maxWidth: '100%' }} />
        </div>
        <div style={{ flex: 1 }}>
          <p>
            <strong>OCR识别结果:</strong>
          </p>
          <pre>{document?.ocrText}</pre>
          <p>
            <strong>分类:</strong>
          </p>
          <Tag color="blue">{document?.category}</Tag>
          <Button type="primary" onClick={handleUpdateCategory} style={{ marginTop: 16 }}>
            修改分类
          </Button>
        </div>
      </div>
      <UpdateCategoryForm
        visible={showUpdateCategoryForm}
        currentCategory={document?.category}
        onCancel={handleCancelUpdateCategory}
        onSuccess={handleUpdateCategorySuccess}
      />
    </Modal>
  );
};

export default DocumentDetailsModal;