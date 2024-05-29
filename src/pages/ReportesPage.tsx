import { Tabs, Row, Col } from 'antd';
import PageLayout from '../components/PageLayout';
import {
  useGetClientesConMoraQuery,
  useGetPolizasPorEstadoQuery,
} from '../api/api';
import TablaClientesConMora from '../components/tablas/TablaClientesReportes';
import TablaPolizasCanceladas from '../components/tablas/TablaPolizasPorEstado';
import TablaPolizasPorVencer from '../components/tablas/TablaPolizasPorVencer';
import { Cliente } from '../types/Cliente';
import { PolizaPorEstado } from '../types/Poliza';

const ReportesPage: React.FC = () => {
  const { data: clientesData, isLoading: isLoadingClientes } =
    useGetClientesConMoraQuery();
  const { data: polizaPorEstadoData, isLoading: isLoadingPolizasPorEstado } =
    useGetPolizasPorEstadoQuery();

  const tabItems = [
    {
      key: '1',
      label: 'Clientes en Mora',
      children: (
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <TablaClientesConMora
              data={clientesData as Cliente[]}
              isLoading={isLoadingClientes}
            />
          </Col>
        </Row>
      ),
    },
    {
      key: '2',
      label: 'Polizas por estados',
      children: (
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <TablaPolizasCanceladas
              data={polizaPorEstadoData as PolizaPorEstado}
              isLoading={isLoadingPolizasPorEstado}
            />
          </Col>
        </Row>
      ),
    },
    {
      key: '3',
      label: 'Polizas Por Vencer',
      children: (
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <TablaPolizasPorVencer />
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <PageLayout>
      <h1>Reportes</h1>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </PageLayout>
  );
};

export default ReportesPage;
