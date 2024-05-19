import { useState } from 'react';
import { Button, Modal, message, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout'

import { useGetPagosQuery, useEliminarPagoMutation } from '../../api/api';
import TablaPagos from '../../components/tablas/TablaPagos';

function PagosPage() {
    const navigate = useNavigate()
    const { data, isLoading } = useGetPagosQuery()
    const [eliminarPago] = useEliminarPagoMutation()
    const handleClick = () => {
        navigate('/pagos/registrar')
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState<number | null>(null);

    const handleOpen = (id: number) => {
        setIsModalOpen(true);
        setId(id);
    };

    const handleOk = () => {
        if (id) {
            eliminarPago(id).unwrap().then(() => {
                message.success('Pago eliminado correctamente');
                navigate('/pagos')
            })
                .catch(() => {
                    message.error('Error al eliminar el pago');
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
                    <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: '24px' }} onClick={handleClick}>Registrar nuevo</Button>
                    <TablaPagos data={data || []} isLoading={isLoading} onDelete={handleOpen} />
                </Col>
            </Row>
            <Modal title="Eliminar pago" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Si" cancelText="No">
                <p>Desea eliminar el pago?</p>
            </Modal>
        </PageLayout>
    )
}

export default PagosPage
