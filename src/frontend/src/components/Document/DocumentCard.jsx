import React, { useState } from 'react';
import { Button, Card, Popconfirm, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DocumentDetailsModal from'@/components/Document/DocumentDetailsModal'
import { delete_document } from '@/services/api';

const { Meta } = Card;

const DocumentCard = ({ document }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const onDeleteConfirm = async () => {
    await delete_document(document?.id);
    window.location.reload()
  };

  return (
    <React.Fragment>
      <Card
        hoverable
        actions={[
          <Button type="text" key="edit" onClick={showModal}>
            <EditOutlined /> 查看 / 编辑
          </Button>,
          <Popconfirm
            title="确定删除此分类吗?"
            onConfirm={onDeleteConfirm}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="text"
              danger
              key="delete"
            >
              <DeleteOutlined /> 删除
            </Button>
          </Popconfirm>
        ]}
      >
        <Meta title={document.name} />
      </Card>

      <DocumentDetailsModal
        isOpen={isModalOpen}
        onCancel={handleModalCancel}
        document={document}
      />
    </React.Fragment>
  );
};

export default DocumentCard;
