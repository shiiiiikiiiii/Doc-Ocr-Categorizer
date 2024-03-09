import React, { useState, useEffect } from 'react';
import { Input, List, Spin } from 'antd';
import DocumentItem from '@/components/Document/DocumentItem';
import { searchDocuments } from '@/services/api';

const SearchDocument = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setDocuments([]);
    } else {
      fetchDocuments();
    }
  }, [searchTerm]);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const data = await searchDocuments(searchTerm);
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e?.target?.value);
  };

  return (
    <div>
      <Input.Search
        placeholder="搜索文档"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />
      {loading ? (
        <Spin />
      ) : (
        <List
          dataSource={documents}
          renderItem={(document) => <DocumentItem document={document} />}
        />
      )}
    </div>
  );
};

export default SearchDocument;