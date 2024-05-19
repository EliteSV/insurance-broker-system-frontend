import { Row, Col, Card } from 'antd';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import PageLayout from '../../components/PageLayout';
import { useGetPolizaQuery } from '../../api/api';
import DetallesPoliza from './DetallesPoliza';
import { cuotasToFormaDePago } from '../../utils/utils';
import TablaPagos from '../../components/tablas/TablaPagos';
import { ButtonRegresar } from '../../components/common';

const VerPoliza = () => {
    const { id } = useParams();
    const { data: poliza, isLoading, isFetching, refetch } = useGetPolizaQuery(Number(id));
    return (
        <PageLayout>
            <Row align='middle' style={{ marginTop: '64px' }}>
                <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
                    <ButtonRegresar />
                    <Card title={`${poliza?.codigo || ''} - ${poliza?.nombre || ''}`} loading={isLoading}>
                        <Card type="inner" title="Monto" size='small'>
                            {poliza?.monto}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Forma de pago"
                            size='small'
                        >
                            {cuotasToFormaDePago(poliza?.cuotas)}
                        </Card>
                        {poliza?.vigencias.map((vigencia: any) => (
                            <Card
                                key={vigencia.id}
                                style={{ marginTop: 16 }}
                                type="inner"
                                title={`Vigencia ${dayjs(vigencia.fecha_inicio).format('DD/MM/YYYY')} - ${dayjs(vigencia.fecha_vencimiento).format('DD/MM/YYYY')}`}
                                size='small'
                            >
                                <TablaPagos data={vigencia.pagos} isLoading={isLoading || isFetching} refetch={refetch} />
                            </Card>
                        )
                        )}
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
