import { useState } from 'react';
import { Button, Modal, Space, Table, message, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout'
import { Aseguradora } from '../../types/Aseguradora';
import { useGetAseguradorasQuery, useEliminarAseguradoraMutation } from '../../api/api';

function AseguradorasPage() {
    const navigate = useNavigate()
    const { data, isLoading } = useGetAseguradorasQuery()
    const [eliminarAseguradora] = useEliminarAseguradoraMutation()
    const handleClick = () => {
        navigate('/aseguradoras/registrar')
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState<number | null>(null);

    const handleOpen = (id: number) => {
        setIsModalOpen(true);
        setId(id);
    };

    const handleOk = () => {
        if (id) {
            eliminarAseguradora(id).unwrap().then(() => {
                message.success('Aseguradora eliminada correctamente');
                navigate('/aseguradoras')
            })
                .catch(() => {
                    message.error('Error al eliminar la aseguradora');
                });
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns: TableProps<Aseguradora>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
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
            responsive: ['md'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['md'],
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/aseguradoras/${record.id}`}><EyeOutlined /></Link>
                    <Link to={`/aseguradoras/modificar/${record.id}`}><EditOutlined /></Link>
                    <a onClick={() => handleOpen(record.id)}><DeleteOutlined /> </a>
                </Space>
            ),
        },
    ];
    return (
        <PageLayout>
            <Row>
                <Col xs={{ span: 24 }} lg={{ span: 20, offset: 2 }}>
                    <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: '24px' }} onClick={handleClick}>Registrar nueva</Button>
                    <Table rowKey='id' columns={columns} dataSource={data} loading={isLoading} />
                </Col>
            </Row>
            <Modal title="Eliminar aseguradora" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Si" cancelText="No">
                <p>Desea eliminar la aseguradora?</p>
            </Modal>
        </PageLayout>
    )
}

export default AseguradorasPage
