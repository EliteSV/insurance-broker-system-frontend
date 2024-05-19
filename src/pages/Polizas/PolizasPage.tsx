import { useState } from 'react';
import { Button, Modal, message, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout'
import { useGetPolizasQuery, useEliminarPolizaMutation } from '../../api/api';
import TablaPolizas from '../../components/tablas/TablaPolizas';


function PolizasPage() {
    const navigate = useNavigate()
    const { data, isLoading } = useGetPolizasQuery()
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


    return (
        <PageLayout>
            <Row>
                <Col xs={{ span: 24 }} lg={{ span: 20, offset: 2 }}>
                    <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: '24px' }} onClick={handleClick}>Registrar nueva</Button>
                    <TablaPolizas data={data || []} isLoading={isLoading} onDelete={handleOpen} />
                </Col>
            </Row>
            <Modal title="Eliminar poliza" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Si" cancelText="No">
                <p>Desea eliminar la poliza?</p>
            </Modal>
        </PageLayout>
    )
}

export default PolizasPage
