import { Row, Col, Card } from 'antd';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { useGetClienteQuery, useGetPolizasQuery } from '../../api/api';
import { ButtonRegresar } from '../../components/common';
import DocumentList from '../../components/common/DocumentList';
import TablaPolizas from '../../components/tablas/TablaPolizas';
import { Poliza } from '../../types/Poliza';

const VerCliente = () => {
  const { id } = useParams();
  const { data: cliente, isLoading } = useGetClienteQuery(Number(id));
  const { data: polizas, isLoading: isPolizasLoading } = useGetPolizasQuery();
  const polizasCliente = polizas?.filter(
    (poliza: Poliza) => poliza.cliente_id === Number(id)
  );
  return (
    <PageLayout>
      <Row align="middle" style={{ marginTop: '64px' }}>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <ButtonRegresar />
          <Card title={cliente?.nombre} loading={isLoading}>
            <Card type="inner" title="Dirección">
              {cliente?.direccion}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Teléfono">
              {cliente?.telefono}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Email">
              {cliente?.email}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="DUI">
              {cliente?.dui}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="NIT">
              {cliente?.nit}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Documentos">
              <DocumentList title="" documents={cliente?.documentos || []} />
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Pólizas">
              <TablaPolizas
                data={polizasCliente || []}
                isLoading={isPolizasLoading}
              />
            </Card>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default VerCliente;
