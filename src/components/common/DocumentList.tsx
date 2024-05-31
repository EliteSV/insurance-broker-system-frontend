import React, { useState } from 'react';
import { Card, Col, Row, Button, Modal, message, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useEliminarDocumentosClienteMutation } from '../../api/api';

const { Text } = Typography;

type Document = {
  id: number;
  url: string;
};

type DocumentListProps = {
  title: string;
  documents: Document[];
  allowDelete?: boolean;
  refetch?: () => void;
};

const DocumentList: React.FC<DocumentListProps> = ({
  title,
  documents,
  allowDelete,
  refetch,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentUrlToDelete, setDocumentUrlToDelete] = useState<string | null>(
    null
  );
  const [eliminarDocumentos, eliminarDocumentosResult] =
    useEliminarDocumentosClienteMutation();
  const showDeleteModal = (url: string) => {
    setDocumentUrlToDelete(url);
    setIsModalOpen(true);
  };

  const handleDeleteDocument = () => {
    if (documentUrlToDelete) {
      eliminarDocumentos({ urls: [documentUrlToDelete] })
        .unwrap()
        .then(() => {
          message.success('Documento eliminado correctamente');
          refetch?.();
        })
        .catch(() => {
          message.error('Error al eliminar documento');
        })
        .finally(() => {
          setIsModalOpen(false);
          setDocumentUrlToDelete(null);
        });
    }
  };
  return (
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
                  allowDelete && (
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        showDeleteModal(item.url);
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
                    <div
                      style={{ fontSize: 24, color: 'gray', marginBottom: 8 }}
                    >
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
      <Modal
        title="Eliminar documento"
        open={isModalOpen}
        onOk={handleDeleteDocument}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={eliminarDocumentosResult.isLoading}
        okText="Si"
        cancelText="No"
      >
        <p>¿Desea eliminar este documento?</p>
      </Modal>
    </div>
  );
};

export default DocumentList;
