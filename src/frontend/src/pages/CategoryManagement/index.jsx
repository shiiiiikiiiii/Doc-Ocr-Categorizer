import React, { useState, useEffect } from 'react';
import { Button, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CategoryCard from '@/components/Category/CategoryCard'
import AddCategoryDialog from '@/components/Category/AddCategoryDialog';
import { get_all_categories } from '@/services/api';

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
      const data = await get_all_categories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
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
        onAdd={() => {
          setShowAddDialog(false);
        }}
      />
    </div>
  );
};

export default CategoryManagement;