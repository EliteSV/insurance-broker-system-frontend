import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { TableProps } from 'antd';
import { Button, Modal, Space, Table, message, Row, Col } from 'antd';
import PageLayout from '../../components/PageLayout';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useEliminarUsuarioMutation, useGetUsuariosQuery } from '../../api/api';
import { Usuario } from '../../types/Usuario';
import { formatDate } from '../../utils/utils';

function UsuariosPage() {
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useGetUsuariosQuery();
  const [eliminarUsuario, eliminarUsuarioResult] = useEliminarUsuarioMutation();
  const handleClick = () => {
    navigate('/usuarios/registrar');
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);

  const handleOpen = (id: number) => {
    setIsModalOpen(true);
    setId(id);
  };

  const handleOk = () => {
    if (id) {
      eliminarUsuario(id)
        .unwrap()
        .then(() => {
          message.success('Usuario eliminado correctamente');
          navigate('/usuarios');
        })
        .catch(() => {
          message.error('Error al eliminar usuario');
        })
        .finally(() => {
          setIsModalOpen(false);
        });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: TableProps<Usuario>['columns'] = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Rol',
      key: 'rol',
      render: (record) => record.rol?.nombre,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['md'],
    },
    {
      title: 'Creado',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (record) => <span>{formatDate(record)}</span>,
    },
    {
      title: 'Actualizado',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (record) => <span>{formatDate(record)}</span>,
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/usuarios/${record.id}`}>
            <EyeOutlined />
          </Link>
          <Link to={`/usuarios/modificar/${record.id}`}>
            <EditOutlined />
          </Link>
          <a onClick={() => handleOpen(record.id)}>
            <DeleteOutlined />{' '}
          </a>
        </Space>
      ),
    },
  ];
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
          <Table
            rowKey="id"
            columns={columns}
            dataSource={data}
            loading={isLoading || isFetching}
          />
        </Col>
      </Row>
      <Modal
        title="Eliminar usuario"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={eliminarUsuarioResult.isLoading}
        okText="Si"
        cancelText="No"
      >
        <p>Desea eliminar el usuario?</p>
      </Modal>
    </PageLayout>
  );
}

export default UsuariosPage;
