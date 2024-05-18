import { Button, Row, Col, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { useGetPolizaQuery } from '../../api/api';
import DetallesPoliza from './DetallesPoliza';

const VerPoliza = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: poliza, isLoading } = useGetPolizaQuery(Number(id));
    return (
        <PageLayout>
            <Row align='middle' style={{ marginTop: '64px' }}>
                <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
                    <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} size="large" onClick={() => navigate('/polizas')} style={{ marginBottom: 24 }}>
                        Regresar
                    </Button>
                    <Card title={`${poliza?.id || ''} - ${poliza?.nombre || ''}`} loading={isLoading}>
                        <Card type="inner" title="Monto" size='small'>
                            {poliza?.monto}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Cuotas"
                            size='small'
                        >
                            {poliza?.cuotas}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Estado"
                            size='small'
                        >
                            {poliza?.estado}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Aseguradora"
                            size='small'
                        >
                            {poliza?.aseguradora.nombre}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Cliente"
                            size='small'
                        >
                            {poliza?.cliente.nombre}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Detalles"
                            size='small'
                        >
                            <DetallesPoliza tipo_poliza_id={poliza?.tipo_poliza_id} detalles={poliza?.detalles} />
                        </Card>
                    </Card>
                </Col>
            </Row>
        </PageLayout >
    );
};

export default VerPoliza;
