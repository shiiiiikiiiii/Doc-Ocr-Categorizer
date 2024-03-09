import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { addCategory } from '@/services/api';

const AddCategoryDialog = ({ visible, onCancel, onAdd }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const values = await form.validateFields();
      const newCategory = await addCategory(values);
      onAdd(newCategory);
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
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
          rules={[{ required: true, message: '请输入分类名称!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryDialog;