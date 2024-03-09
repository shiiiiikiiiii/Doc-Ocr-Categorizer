import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const DocumentThumbnail = ({ document, onClick }) => {
  return (
    <Card
      hoverable
      cover={<img alt={document.name} src={document.thumbnailUrl} />}
      onClick={onClick}
    >
      <Meta title={document.name} description={document.category} />
    </Card>
  );
};

export default DocumentThumbnail;