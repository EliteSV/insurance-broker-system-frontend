import { Row, Col, Typography, Button, Spin, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { Poliza } from '../../types/Poliza';
import { useGetPolizaQuery, useModificarPolizaMutation } from '../../api/api';
import PolizaForm from '../../components/forms/PolizaForm';

const { Title } = Typography;

const ModificarPoliza = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: poliza, isLoading } = useGetPolizaQuery(Number(id));
    const [modificar, modificarResult] = useModificarPolizaMutation();
    const onFinish = (values: Partial<Poliza>) => {
        const payload: any = { id: Number(id), ...values };
        modificar(payload).unwrap().then(() => {
            message.success('Póliza modificada con éxito.');
            navigate('/polizas');
        }).catch(() => {
            message.error('Ocurrió un error al modificar la poliza.');
        });
    };

    return (
        <PageLayout>
            <Row align='middle' style={{ marginTop: '64px' }}>
                <Col xs={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 8 }}>
                    <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} size="large" onClick={() => navigate('/polizas')} style={{ marginBottom: 24 }}>
                        Regresar
                    </Button>
                    <Title level={2}>Modificar Poliza</Title>
                    <Spin spinning={isLoading}>
                        <PolizaForm initialValues={poliza} onFinish={onFinish} submitText='Modificar' isLoading={modificarResult.isLoading} />
                    </Spin>
                </Col>
            </Row>
        </PageLayout>
    );
};

export default ModificarPoliza;
