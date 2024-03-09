import React, { useState, useEffect } from 'react';
import { useParams } from 'umi';
import { Row, Col, Spin } from 'antd';
import DocumentDetailsModal from '@/components/Document/DocumentDetailsModal';
import DocumentThumbnail from '@/pages/CategoryDetail/util/DocumentThumbnail';
import { getDocumentsByCategory } from '@/services/api';

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, [categoryId]);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const data = await getDocumentsByCategory(categoryId);
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
  };

  const handleCloseModal = () => {
    setSelectedDocument(null);
  };

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <Row gutter={[16, 16]}>
          {documents.map((document) => (
            <Col key={document?.id} xs={24} sm={12} md={8} lg={6}>
              <DocumentThumbnail
                document={document}
                onClick={() => handleDocumentClick(document)}
              />
            </Col>
          ))}
        </Row>
      )}
      {selectedDocument && (
        <DocumentDetailsModal
          visible={true}
          document={selectedDocument}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CategoryDetails;