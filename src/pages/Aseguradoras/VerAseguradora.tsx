import { Button, Row, Col, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { useGetAseguradoraQuery } from '../../api/api';

const VerAseguradora = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: aseguradora } = useGetAseguradoraQuery(Number(id));

    return (
        <PageLayout>
            <Row align='middle' style={{ marginTop: '64px' }}>
                <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
                    <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} size="large" onClick={() => navigate('/aseguradoras')} style={{ marginBottom: 24 }}>
                        Regresar
                    </Button>
                    <Card title={aseguradora?.nombre}>
                        <Card type="inner" title="Dirección">
                            {aseguradora?.direccion}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Telefono"
                        >
                            {aseguradora?.telefono}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Email"
                        >
                            {aseguradora?.email}
                        </Card>
                    </Card>
                </Col>
            </Row>
        </PageLayout >
    );
};

export default VerAseguradora;
