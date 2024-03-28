import axios from 'axios';
import { API_BASE_URL } from '@/constants';


// This upload encapsulation is only for reference, for the api call should be called inside the Antd Upload component
export const upload_document_image = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      console.error('Validation Error:', error.response.data);
    } else {
      console.error('Error uploading document:', error);
    }
  }
};


// Following are document related API

export const get_document_detail = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/documents/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching document details:', error);
  }
};


export const get_all_documents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/documents`);
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
};


export const search_documents_by_name = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/documents/search/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error searching documents by name:', error);
  }
};


export const delete_document = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/documents/${id}`);
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};

/**
 * Modify an existing document
 * @param {id} int - The document to be modified
 * @param {object} document_data - The document object that the document is to become.
 * @param {number} [document_data.id] - The new id of the document.
 * @param {string} [document_data.name] - The new name of the document.
 * @returns {Promise<object>} A promise that resolves with the added category data.
 * @example
 */
export const update_document = async (id, document_data) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/documents/${id}`, document_data);
    return response.data;
  } catch (error) {
    console.error('Error updating document category:', error);
  }
};


// This is pic related API

export const get_image_url_by_document = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/images/${id}`);
    return response.data.image_url;
  } catch (error) {
    console.error('Error fetching image URL by document ID:', error);
  }
};


// Following are category related API

export const get_all_categories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};


/**
 * Add a new category
 * @param {object} category - The category object to be added.
 * @param {string} category.name - The name of the category.
 * @param {string} [category.description] - An optional description of the category.
 * @returns {Promise<object>} A promise that resolves with the added category data.
 * @example
 */
export const add_category = async (category) => {
  if (!category.name) {
    throw new Error('Category name is required.');
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/categories`, category);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const { detail } = error.response.data;
      throw new Error(`Validation Error: ${detail}`);
    } else {
      throw new Error('Error adding category: ' + error.message);
    }
  }
};


/**
 * Modify an existing category
 * @param {number} id - The category to be modified
 * @param {object} category_data - The category object that the category is to become.
 * @param {number} [category_data.id] - The new id of the category.
 * @param {string} [category_data.name] - The new name of the category.
 * @param {string} [category_data.description] - The new description of the category.
 * @returns {Promise<object>} A promise that resolves with the added category data.
 * @example
 */
export const update_category = async (id, category_data) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/categories/${id}`, category_data);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};


export const delete_category = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/categories/${id}`);
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};


export const get_documents_by_category = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories/${id}/documents`);
    return response.data;
  } catch (error) {
    console.error('Error fetching documents by category:', error);
  }
};