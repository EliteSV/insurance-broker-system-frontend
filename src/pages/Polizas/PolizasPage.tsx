import { useState } from 'react';
import { Button, Modal, Space, Table, message, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout'
import { Poliza } from '../../types/Poliza';
import { useGetPolizasQuery, useEliminarPolizaMutation } from '../../api/api';

function PolizasPage() {
    const navigate = useNavigate()
    const { data } = useGetPolizasQuery()
    const [eliminarPoliza] = useEliminarPolizaMutation()
    const handleClick = () => {
        navigate('/polizas/registrar')
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState<number | null>(null);

    const handleOpen = (id: number) => {
        setIsModalOpen(true);
        setId(id);
    };

    const handleOk = () => {
        if (id) {
            eliminarPoliza(id).unwrap().then(() => {
                message.success('Poliza eliminada correctamente');
                navigate('/polizas')
            })
                .catch(() => {
                    message.error('Error al eliminar la poliza');
                });
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns: TableProps<Poliza>['columns'] = [
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
            title: 'Monto',
            dataIndex: 'monto',
            key: 'monto',
            responsive: ['lg'],
        },
        {
            title: 'Cuotas',
            dataIndex: 'cuotas',
            key: 'cuotas',
            responsive: ['lg'],
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            responsive: ['md'],
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/polizas/${record.id}`}><EyeOutlined /></Link>
                    <Link to={`/polizas/modificar/${record.id}`}><EditOutlined /></Link>
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
                    <Table rowKey='id' columns={columns} dataSource={data} />
                </Col>
            </Row>
            <Modal title="Eliminar poliza" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Si" cancelText="No">
                <p>Desea eliminar la poliza?</p>
            </Modal>
        </PageLayout>
    )
}

export default PolizasPage
