// 这里只展示与文档分类相关的 API 请求函数
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001';

// APIs for category management
export const getCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data;
};

export const addCategory = async (category) => {
  const response = await axios.post(`${API_BASE_URL}/categories`, category);
  return response.data;
};

export const updateCategory = async (categoryId, updatedCategory) => {
  const response = await axios.patch(`${API_BASE_URL}/categories/${categoryId}`, updatedCategory);
  return response.data;
};

export const deleteCategory = async (categoryId) => {
  await axios.delete(`${API_BASE_URL}/categories/${categoryId}`);
};

// API for search document
export const searchDocuments = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/documents/search?query=${query}`);
  return response.data;
};

// APIs for document management
export const updateDocumentCategory = async (documentId, newCategory) => {
  const response = await axios.post(`${API_BASE_URL}/documents/${documentId}/category`, { category: newCategory });
  return response.data;
};