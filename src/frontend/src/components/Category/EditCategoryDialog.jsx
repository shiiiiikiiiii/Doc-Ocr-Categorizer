import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { update_category } from '@/services/api';

const EditCategoryDialog = ({ isOpen, category, onCancel, onEdit }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const values = await form.validateFields();
      const updatedCategory = await update_category(category?.id, values);
      onEdit(updatedCategory);
      window.location.reload()
    } catch (error) {
      console.error('Error updating category:', error);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      title="编辑分类"
      okText="保存"
      cancelText="取消"
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" name="editCategory" initialValues={category}>
        <Form.Item
          name="name"
          label="分类名称 (In English)"
          rules={[{ required: true, message: '请输入分类名称!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCategoryDialog;