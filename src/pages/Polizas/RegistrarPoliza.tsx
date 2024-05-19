import { Row, Col, Typography, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { useCrearPolizaMutation } from '../../api/api';
import PolizaForm from '../../components/forms/PolizaForm';

const { Title } = Typography;

const RegistrarPoliza = () => {
    const navigate = useNavigate();
    const [crearPoliza, crearPolizaResult] = useCrearPolizaMutation();
    const onFinish = (values: any) => {
        const { vigencia, ...rest } = values;
        const payload = {
            ...rest,
            fecha_inicio: vigencia[0],
            fecha_vencimiento: vigencia[1],
            estado: 'VIGENTE',
        };
        crearPoliza(payload).unwrap().then(() => {
            message.success('Poliza registrada con éxito.');
            navigate('/polizas');
        }).catch(() => {
            message.error('Ocurrió un error al registrar la poliza.');
        });
    };

    return (
        <PageLayout>
            <Row align='middle' style={{ marginTop: '64px' }}>
                <Col xs={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 8 }}>
                    <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} size="large" onClick={() => navigate('/polizas')} style={{ marginBottom: 24 }}>
                        Regresar
                    </Button>
                    <Title level={2}>Registrar Poliza</Title>
                    <PolizaForm onFinish={onFinish} submitText='Registrar' isLoading={crearPolizaResult.isLoading} showVigencia />
                </Col>
            </Row>
        </PageLayout>
    );
};

export default RegistrarPoliza;
