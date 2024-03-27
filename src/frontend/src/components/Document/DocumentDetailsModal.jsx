import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select, Typography } from 'antd';
import { update_document, get_image_url_by_document, get_all_categories } from '@/services/api';

const DocumentDetailsModal = ({ isOpen, document, onCancel }) => {
  const [editingDocument, setEditingDocument] = useState({ ...document });
  const [imageUrl, setImageUrl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen && document.id) {
      fetchCategories();
      getImageUrl(document.id);
      form.setFieldsValue({
        categoryId: editingDocument.category_id,
        documentName: editingDocument.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, document.id]);

  const getImageUrl = async (docId) => {
    try {
      const url = await get_image_url_by_document(docId);
      setImageUrl(url);
    } catch (error) {
      console.error('Error fetching image URL:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categories = await get_all_categories();
      setCategories(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const updatedDocument = {
        "category_id": values.categoryId,
        "name": values.documentName,
      };
      await update_document(editingDocument.id, updatedDocument);
      window.location.reload()
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <Modal
      title="文档详情"
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>取消</Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>提交</Button>
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="OCR识别结果">
          <div style={{ maxHeight: '100px', overflowX: 'auto' }}>
            <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }}>
              {editingDocument.ocr_result.map((item) => item.text).join('\n')}
            </Typography.Paragraph>
          </div>
        </Form.Item>
        <Form.Item name="categoryId" label="分类ID">
          <Select>
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="documentName" label="文档名称">
          <Input />
        </Form.Item>
        <Form.Item label="下载文档图片">
          <div style={{ maxHeight: '50px', overflowX: 'auto' }}>
            <Typography.Text copyable>{imageUrl}</Typography.Text>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DocumentDetailsModal;
