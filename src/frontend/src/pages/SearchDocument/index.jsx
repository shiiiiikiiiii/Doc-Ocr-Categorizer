import React, { useState } from 'react';
import { Input, Button, List } from 'antd';
import DocumentDetailsModal from '@/components/Document/DocumentDetailsModal';
import { search_documents_by_name } from '@/services/api';

const SearchDocument = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const results = await search_documents_by_name(searchTerm);
        setDocuments(results);
      } catch (error) {
        console.error('Error searching documents:', error);
      }
    }
  };

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedDocument(null);
    setShowModal(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          placeholder="请输入文档名称搜索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1 }}
        />
        <Button type="primary" onClick={handleSearch}>
          搜索
        </Button>
      </div>
      <List
        dataSource={documents}
        renderItem={(document) => (
          <List.Item
            key={document.id}
          >
            <List.Item.Meta
              title={document.name}
              description={
                document.ocr_result
                  .map((item) => item.text)
                  .join(', ')
              }
            />
            <Button
              type="default"
              onClick={() => handleDocumentClick(document)}
              style={{ float: 'right' }}
            >
              查看详情 / 修改
            </Button>
          </List.Item>
        )}
      />
      {selectedDocument && (
        <DocumentDetailsModal
          isOpen={showModal}
          document={selectedDocument}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default SearchDocument;