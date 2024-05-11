import { Row, Col, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { Aseguradora } from '../../types/Aseguradora';
import { useCrearAseguradoraMutation } from '../../api/api';
import AseguradorasForm from '../../components/forms/AseguradorasForm';

const { Title } = Typography;

const RegistrarAseguradora = () => {
    const navigate = useNavigate();
    const [crearAseguradora] = useCrearAseguradoraMutation();
    const onFinish = (values: Partial<Aseguradora>) => {
        crearAseguradora(values).unwrap().then(() => {
            message.success('Aseguradora registrada con éxito.');
            navigate('/aseguradoras');
        }).catch(() => {
            message.error('Ocurrió un error al registrar la aseguradora.');
        });
    };

    return (
        <PageLayout>
            <Row align='middle' style={{ marginTop: '64px' }}>
                <Col xs={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 8 }}>
                    <Title level={2}>Registrar Aseguradora</Title>
                    <AseguradorasForm onFinish={onFinish} submitText='Registrar' />
                </Col>
            </Row>
        </PageLayout>
    );
};

export default RegistrarAseguradora;
