import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { update_document_category } from '@/services/api';

const UpdateCategoryForm = ({ visible, currentCategory, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const values = await form.validateFields();
      const updatedCategory = await update_document_category(values?.category);
      onSuccess(updatedCategory);
    } catch (error) {
      console.error('Error updating category:', error);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      open={visible}
      title="修改分类"
      okText="保存"
      cancelText="取消"
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" name="updateCategory" initialValues={{ category: currentCategory }}>
        <Form.Item
          name="category"
          label="分类名称"
          rules={[{ required: true, message: '请输入分类名称!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCategoryForm;