import React, { useState, useEffect } from 'react';
import { Card, Button, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CategoryCard from '@/components/Category/CategoryCard'
import AddCategoryDialog from '@/components/Category/AddCategoryDialog';
import { getCategories } from '@/services/api';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
    setShowAddDialog(false);
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setShowAddDialog(true)}
        style={{ marginBottom: 16 }}
      >
        添加分类
      </Button>
      {loading ? (
        <Spin />
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {categories?.map((category) => (
            <CategoryCard key={category?.id} category={category} />
          ))}
        </div>
      )}
      <AddCategoryDialog
        visible={showAddDialog}
        onCancel={() => setShowAddDialog(false)}
        onAdd={handleAddCategory}
      />
    </div>
  );
};

export default CategoryManagement;