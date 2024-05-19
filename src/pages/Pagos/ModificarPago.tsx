import { Row, Col, Typography, Button, Spin, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { useGetPagoQuery, useModificarPagoMutation } from '../../api/api';
import PagoForm from '../../components/forms/PagoForm';
import { formatPago, pagoToFormData } from '../../utils/utils';


const { Title } = Typography;

const ModificarPago = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetPagoQuery(Number(id));
    const [modificar, modificarResult] = useModificarPagoMutation();
    const onFinish = (values: any) => {
        const formData = pagoToFormData(values, 'PUT');
        const payload = {
            id: Number(id),
            formData
        }
        modificar(payload).unwrap().then(() => {
            message.success('Pago actualizado con éxito.');
            navigate('/pagos');
        }).catch(() => {
            message.error('Ocurrió un error al actualizar el pago.');
        });
    };
    const pago = formatPago(data);

    return (
        <PageLayout>
            <Row align='middle' style={{ marginTop: '64px' }}>
                <Col xs={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 8 }}>
                    <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} size="large" onClick={() => navigate('/pagos')} style={{ marginBottom: 24 }}>
                        Regresar
                    </Button>
                    <Title level={2}>Modificar Pago</Title>
                    <Spin spinning={isLoading}>
                        <PagoForm initialValues={pago} onFinish={onFinish} submitText='Modificar' isLoading={modificarResult.isLoading} />
                    </Spin>
                </Col>
            </Row>
        </PageLayout>
    );
};

export default ModificarPago;
