import { useState } from 'react';
import { Button, Modal, message, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { useGetClientesQuery, useEliminarClienteMutation } from '../../api/api';
import TablaClientes from '../../components/tablas/TablaClientes';

function ClientesPage() {
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useGetClientesQuery();
  const [eliminarCliente, eliminarClienteResult] = useEliminarClienteMutation();
  const handleClick = () => {
    navigate('/clientes/registrar');
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);

  const handleOpen = (id: number) => {
    setIsModalOpen(true);
    setId(id);
  };

  const handleOk = () => {
    if (id) {
      eliminarCliente(id)
        .unwrap()
        .then(() => {
          message.success('Cliente eliminado correctamente');
          navigate('/clientes');
        })
        .catch(() => {
          message.error(
            'Error al eliminar cliente, verifique que no tenga pólizas asociadas'
          );
        })
        .finally(() => {
          setIsModalOpen(false);
        });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <PageLayout>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 20, offset: 2 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginBottom: '24px' }}
            onClick={handleClick}
          >
            Registrar nuevo
          </Button>
          <TablaClientes
            data={data || []}
            isLoading={isLoading || isFetching}
            onDelete={handleOpen}
          />
        </Col>
      </Row>
      <Modal
        title="Eliminar cliente"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={eliminarClienteResult.isLoading}
        okText="Si"
        cancelText="No"
      >
        <p>Desea eliminar el cliente?</p>
      </Modal>
    </PageLayout>
  );
}

export default ClientesPage;
