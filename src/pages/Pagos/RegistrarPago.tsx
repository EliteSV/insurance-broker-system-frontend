import { Row, Col, Typography, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { Pago } from '../../types/Pago';
import { useCrearPagoMutation } from '../../api/api';
import PagoForm from '../../components/forms/PagoForm';
import { pagoToFormData } from '../../utils/utils';

const { Title } = Typography;

const RegistrarPago = () => {
    const navigate = useNavigate();
    const [crearPago, crearPagoResult] = useCrearPagoMutation();
    const onFinish = (values: Partial<Pago>) => {
        const formData = pagoToFormData(values);
        crearPago(formData).unwrap().then(() => {
            message.success('Pago registrada con éxito.');
            navigate('/pagos');
        }).catch(() => {
            message.error('Ocurrió un error al registrar el pago.');
        });
    };

    return (
        <PageLayout>
            <Row align='middle' style={{ marginTop: '64px' }}>
                <Col xs={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 8 }}>
                    <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} size="large" onClick={() => navigate('/pagos')} style={{ marginBottom: 24 }}>
                        Regresar
                    </Button>
                    <Title level={2}>Registrar Pago</Title>
                    <PagoForm onFinish={onFinish} submitText='Registrar' isLoading={crearPagoResult.isLoading} />
                </Col>
            </Row>
        </PageLayout>
    );
};

export default RegistrarPago;
