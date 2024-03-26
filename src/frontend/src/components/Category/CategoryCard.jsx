import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditCategoryDialog from '@/components/Category/EditCategoryDialog';
import { delete_category } from '@/services/api';

const { Meta } = Card;

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEdit = () => {
    setShowEditDialog(true);
  };

  const handleDelete = async () => {
    try {
      await delete_category(category?.id);
      // Refresh category list after successful deletion
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleCardClick = () => {
    // navigate(`/category/${category?.id}`);
  };

  return (
    <>
      <Card
        hoverable
        style={{ width: 240, marginRight: 16, marginBottom: 16 }}
        actions={[
          <Button type="text" key="edit" onClick={handleEdit}>
            <EditOutlined /> 编辑
          </Button>,
          <Popconfirm
            title="确定删除此分类吗?"
            onConfirm={handleDelete}
            okText="确定"
            cancelText="取消"
          >
            <Button type="text" danger key="delete">
              <DeleteOutlined /> 删除
            </Button>
          </Popconfirm>
        ]}
        onClick={handleCardClick}
      >
        <Meta title={category?.name} />
      </Card>
      <EditCategoryDialog
        open={showEditDialog}
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