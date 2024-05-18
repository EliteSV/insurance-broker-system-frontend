import { useState } from 'react';
import { Button, Modal, message, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout'

import { useGetAseguradorasQuery, useEliminarAseguradoraMutation } from '../../api/api';
import TablaAseguradoras from '../../components/tablas/TablaAseguradoras';

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

    return (
        <PageLayout>
            <Row>
                <Col xs={{ span: 24 }} lg={{ span: 20, offset: 2 }}>
                    <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: '24px' }} onClick={handleClick}>Registrar nueva</Button>
                    <TablaAseguradoras data={data || []} isLoading={isLoading} onDelete={handleOpen} />
                </Col>
            </Row>
            <Modal title="Eliminar aseguradora" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Si" cancelText="No">
                <p>Desea eliminar la aseguradora?</p>
            </Modal>
        </PageLayout>
    )
}

export default AseguradorasPage
