import { useState } from 'react';
import { Button, Modal, message, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout'
import { useGetPolizasQuery, useEliminarPolizaMutation, useRenovarPolizaMutation} from '../../api/api';
import TablaPolizas from '../../components/tablas/TablaPolizas';
import dayjs from "dayjs";


function PolizasPage() {
    const navigate = useNavigate()
    const { data, isLoading, refetch } = useGetPolizasQuery()
    const [eliminarPoliza] = useEliminarPolizaMutation()
    const [renovarPoliza] = useRenovarPolizaMutation();
    const handleClick = () => {
        navigate('/polizas/registrar')
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
    const [id, setId] = useState<number | null>(null);
    const [nombre, setNombre] = useState<string | null>(null);

    const handleOpen = (id: number) => {
        setIsModalOpen(true);
        setId(id);
    };

    const handleRenewOpen = (id: number, nombre: string) => {
        setIsRenewModalOpen(true);
        setId(id);
        setNombre(nombre);
    };

    const handleRenewOk = () => {
        if (id) {
            const fecha_inicio = dayjs().format("YYYY-MM-DD");
            const fecha_vencimiento = dayjs().add(1, "year").format("YYYY-MM-DD");
            renovarPoliza({ poliza_id: id, fecha_inicio, fecha_vencimiento }).unwrap().then(() => {
                message.success(`Poliza ${nombre} renovada por un año más.`);
                refetch();
            })
                .catch(() => {
                    message.error('Error al renovar la poliza');
                });
        }
        setIsRenewModalOpen(false);
    };

    const handleRenewCancel = () => {
        setIsRenewModalOpen(false);
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
                    <TablaPolizas data={data || []} isLoading={isLoading} onDelete={handleOpen} onRenew={handleRenewOpen} />
                </Col>
            </Row>
            <Modal title="Eliminar poliza" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Si" cancelText="No">
                <p>Desea eliminar la poliza?</p>
            </Modal>
            <Modal title="Renovar poliza" open={isRenewModalOpen} onOk={handleRenewOk} onCancel={handleRenewCancel} okText="Si" cancelText="No">
            <p>Está a punto de renovar la poliza {nombre} por un año más, ¿está de acuerdo?</p>
            </Modal>
        </PageLayout>
    )
}

export default PolizasPage
