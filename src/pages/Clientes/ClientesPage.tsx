import { useState } from 'react';
import { Button, Modal, Space, Table, message, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout'
import { Cliente } from '../../types/Cliente';
import { useGetClientesQuery, useEliminarClienteMutation } from '../../api/api';

function ClientesPage() {
    const navigate = useNavigate()
    const { data, isLoading, isFetching } = useGetClientesQuery()
    const [eliminarCliente, eliminarClienteResult] = useEliminarClienteMutation()
    const handleClick = () => {
        navigate('/clientes/registrar')
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState<number | null>(null);

    const handleOpen = (id: number) => {
        setIsModalOpen(true);
        setId(id);
    };

    const handleOk = () => {
        if (id) {
            eliminarCliente(id).unwrap().then(() => {
                message.success('Cliente eliminado correctamente');
                navigate('/clientes')
            })
                .catch(() => {
                    message.error('Error al eliminar cliente');
                }).finally(() => {
                    setIsModalOpen(false);
                });
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns: TableProps<Cliente>['columns'] = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Dirección',
            dataIndex: 'direccion',
            key: 'direccion',
            responsive: ['lg'],
        },
        {
            title: 'Telefono',
            dataIndex: 'telefono',
            key: 'telefono',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['md'],
        },
        {
            title: 'DUI',
            dataIndex: 'dui',
            key: 'dui',
            responsive: ['lg'],
        },
        {
            title: 'NIT',
            dataIndex: 'nit',
            key: 'nit',
            responsive: ['lg'],
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/clientes/${record.id}`}><EyeOutlined /></Link>
                    <Link to={`/clientes/modificar/${record.id}`}><EditOutlined /></Link>
                    <a onClick={() => handleOpen(record.id)}><DeleteOutlined /> </a>
                </Space>
            ),
        },
    ];
    return (
        <PageLayout>
            <Row>
                <Col xs={{ span: 24 }} lg={{ span: 20, offset: 2 }}>
                    <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: '24px' }} onClick={handleClick}>Registrar nuevo</Button>
                    <Table rowKey='id' columns={columns} dataSource={data} loading={isLoading || isFetching} />
                </Col>
            </Row>
            <Modal title="Eliminar cliente" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} confirmLoading={eliminarClienteResult.isLoading} okText="Si" cancelText="No">
                <p>Desea eliminar el cliente?</p>
            </Modal>
        </PageLayout>
    )
}

export default ClientesPage
