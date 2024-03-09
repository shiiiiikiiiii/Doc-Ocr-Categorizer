import React, { useState } from 'react';
import { List, Avatar } from 'antd';
import DocumentDetailsModal from '@/components/Document/DocumentDetailsModal';

const DocumentItem = ({ document }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleShowDetails = () => {
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
  };

  return (
    <>
      <List.Item
        actions={[
          <a key="view" onClick={handleShowDetails}>
            查看详情
          </a>,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={document?.thumbnailUrl} />}
          title={document?.name}
          description={document?.category}
        />
      </List.Item>
      <DocumentDetailsModal
        visible={showDetailsModal}
        document={document}
        onCancel={handleCloseModal}
      />
    </>
  );
};

export default DocumentItem;