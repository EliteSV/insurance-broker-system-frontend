import { Button, Row, Col, Card, Image, Flex } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { useGetClienteQuery } from '../../api/api';

const VerCliente = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: cliente, isLoading } = useGetClienteQuery(Number(id));

    return (
        <PageLayout>
            <Row align='middle' style={{ marginTop: '64px' }}>
                <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
                    <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} size="large" onClick={() => navigate('/clientes')} style={{ marginBottom: 24 }}>
                        Regresar
                    </Button>
                    <Card title={cliente?.nombre} loading={isLoading}>
                        <Card type="inner" title="Dirección">
                            {cliente?.direccion}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Telefono"
                        >
                            {cliente?.telefono}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Email"
                        >
                            {cliente?.email}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="DUI"
                        >
                            {cliente?.dui}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="NIT"
                        >
                            {cliente?.nit}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Documentos"
                        >
                            <Flex gap="middle" align="start">
                                {cliente?.documentos.map((documento) => (

                                    <Image
                                        key={documento.id}
                                        width={200}
                                        src={documento.url}
                                    />
                                ))}
                            </Flex>
                        </Card>
                    </Card>
                </Col>
            </Row>
        </PageLayout >
    );
};

export default VerCliente;
