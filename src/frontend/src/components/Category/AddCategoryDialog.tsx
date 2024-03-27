import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { add_category } from '@/services/api';

interface CategoryFormData {
  name: string;
  description?: string;
}

const AddCategoryDialog: React.FC<{
  visible: boolean;
  onCancel: () => void;
  onAdd: (newCategory: CategoryFormData) => void;
}> = ({ visible, onCancel, onAdd }) => {
  const [form] = Form.useForm<CategoryFormData>();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const values = await form.validateFields();
      const newCategoryData = {
        name: values.name,
        description: values.description || undefined,
      };
      const newCategory = await add_category(newCategoryData);
      onAdd(Object(newCategory));
      window.location.reload()
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      open={visible}
      title="添加分类"
      okText="添加"
      cancelText="取消"
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" name="addCategory">
        <Form.Item
          name="name"
          label="分类名称"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="description"
          label="分类描述"
          rules={[{ max: 200 }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryDialog;