import { Button, Row, Col, Card, Image } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import PageLayout from '../../components/PageLayout';
import { useGetPagoQuery } from '../../api/api';
import { getEstadoPagoTag } from '../../utils/tags';
import { EstadoPago } from '../../types/Pago';

const VerPago = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: pago, isLoading } = useGetPagoQuery(Number(id));
    return (
        <PageLayout>
            <Row align='middle' style={{ marginTop: '64px' }}>
                <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
                    <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} size="large" onClick={() => navigate('/pagos')} style={{ marginBottom: 24 }}>
                        Regresar
                    </Button>
                    <Card title={`${pago?.vigencia.poliza.nombre || ''} Cuota ${pago?.cuota || ''}`} loading={isLoading}>
                        <Card type="inner" title="Cantidad">
                            {pago?.cantidad}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Fecha Vencimiento"
                        >
                            {pago?.fecha_vencimiento && dayjs(pago?.fecha_vencimiento).format('DD/MM/YYYY')}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Estado"
                        >
                            {getEstadoPagoTag(pago?.estado)}
                        </Card>
                        {pago?.estado === EstadoPago.Pagado && (
                            <>
                                <Card
                                    style={{ marginTop: 16 }}
                                    type="inner"
                                    title="Fecha de Pagado"
                                >
                                    {pago?.fecha_pagado && dayjs(pago?.fecha_pagado).format('DD/MM/YYYY')}
                                </Card>
                                <Card style={{ marginTop: 16 }} type="inner" title="Comprobante">
                                    <Image src={pago?.comprobante} width={200} />
                                </Card>
                            </>
                        )}
                    </Card>
                </Col>
            </Row>
        </PageLayout >
    );
};

export default VerPago;
