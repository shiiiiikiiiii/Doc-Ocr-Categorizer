import React, { useState } from 'react';
import { Card, Tooltip, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditCategoryDialog from '@/components/Category/EditCategoryDialog';
import { deleteCategory } from '@/services/api';

const { Meta } = Card;

const CategoryCard = ({ category }) => {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEdit = () => {
    setShowEditDialog(true);
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(category?.id);
      // Refresh category list after successful deletion
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <>
      <Card
        hoverable
        style={{ width: 240, marginRight: 16, marginBottom: 16 }}
        cover={<img alt={category?.name} src={category?.icon} />}
        actions={[
          <Tooltip title="编辑">
            <EditOutlined key="edit" onClick={handleEdit} />
          </Tooltip>,
          <Popconfirm
            title="确定删除此分类吗?"
            onConfirm={handleDelete}
            okText="确定"
            cancelText="取消"
          >
            <Tooltip title="删除">
              <DeleteOutlined key="delete" />
            </Tooltip>
          </Popconfirm>,
        ]}
      >
        <Meta title={category?.name} description={`文档数量: ${category?.documentCount}`} />
      </Card>
      <EditCategoryDialog
        visible={showEditDialog}
        category={category}
        onCancel={() => setShowEditDialog(false)}
        onEdit={(updatedCategory) => {
          // Update category in the list
          setShowEditDialog(false);
        }}
      />
    </>
  );
};

export default CategoryCard;