import React from 'react';
import { Button, Card, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DocumentDetailsModal from '@/components/Document/DocumentDetailsModal';
import { delete_document } from '@/services/api';

const { Meta } = Card;

const DocumentCard = ({ document }) => {
  return (
    <Card
      hoverable
      actions={[
        <Button type="text" key="edit" onClick={() => { }}>
          <EditOutlined /> 查看 / 编辑
        </Button>,
        <Popconfirm
          title="确定删除此分类吗?"
          onConfirm={() => { }}
          okText="确定"
          cancelText="取消"
        >
          <Button
            type="text"
            danger
            key="delete"
            onClick={() => { }}
          >
            <DeleteOutlined /> 删除
          </Button>
        </Popconfirm>
      ]}
    >
      <Meta title={document.name} />
    </Card>
  );
};

export default DocumentCard;
