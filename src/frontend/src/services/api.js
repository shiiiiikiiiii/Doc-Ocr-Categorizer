import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001';


// Document related API
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


export const update_document_category = async (id, category_id_param) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/documents/${id}/category`, { category_id: category_id_param });
    return response.data;
  } catch (error) {
    console.error('Error updating document category:', error);
  }
};


// Pic related API
export const get_image_url_by_document = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/images/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching image URL by document ID:', error);
  }
};


// Category related API
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
 * @param {Object} category - The category object to be added.
 * @param {string} category.name - The name of the category.
 * @param {string} [category.description] - An optional description of the category.
 * @returns {Promise<Object>} A promise that resolves with the added category data.
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
 * @param {id} int - The category to be modified
 * @param {Object} category_data - The category object that the category is to become.
 * @param {string} [category_data.id] - The new id of the category.
 * @param {string} [category_data.name] - The new name of the category.
 * @param {string} [category_data.description] - The new description of the category.
 * @returns {Promise<Object>} A promise that resolves with the added category data.
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