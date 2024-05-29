import React from 'react';
import { Card, Col, Row, Button, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

type Document = {
  id: number;
  url: string;
};

type DocumentListProps = {
  title: string;
  documents: Document[];
  onRemove?: (url: string) => void;
};

const DocumentList: React.FC<DocumentListProps> = ({
  title,
  documents,
  onRemove,
}) => (
  <div style={{ padding: 16 }}>
    <Typography.Title level={4}>{title}</Typography.Title>
    <Row gutter={[16, 16]} style={{ flexDirection: 'column' }}>
      {documents.map((item) => {
        const fileName = item.url.split('/').pop() || 'Documento';
        const fileExtension = fileName.split('.').pop() || '';
        const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(
          fileExtension
        );
        return (
          <Col xs={24} key={item.id}>
            <Card
              style={{ width: 240, cursor: 'pointer' }}
              onClick={() => window.open(item.url, '_blank')}
              extra={
                onRemove && (
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(item.url);
                    }}
                  />
                )
              }
              cover={
                isImage ? <img alt={fileExtension} src={item.url} /> : null
              }
            >
              {!isImage && (
                <>
                  <div style={{ fontSize: 24, color: 'gray', marginBottom: 8 }}>
                    {fileExtension.toUpperCase()}
                  </div>
                  <Text ellipsis={{ tooltip: fileName }}>{fileName}</Text>
                </>
              )}
            </Card>
          </Col>
        );
      })}
    </Row>
  </div>
);

export default DocumentList;
