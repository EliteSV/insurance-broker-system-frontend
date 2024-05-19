import { Tabs, Row, Col } from "antd";
import PageLayout from "../components/PageLayout";
import {
  useGetClientesConMoraQuery,
  useGetPolizasPorEstadoQuery,
  useGetPolizasPorVencerQuery,
} from "../api/api";
import TablaClientesConMora from "../components/tablas/TablaClientesReportes";
import TablaPolizasCanceladas from "../components/tablas/TablaPolizasPorEstado";
import TablaPolizasPorVencer from "../components/tablas/TablaPolizasPorVencer";
import dayjs from "dayjs";
import { Cliente } from "../types/Cliente";
import { PolizaPorEstado, VigenciaPoliza } from "../types/Poliza";

const { TabPane } = Tabs;

const ReportesPage: React.FC = () => {
  const { data: clientesData, isLoading: isLoadingClientes } =
    useGetClientesConMoraQuery();
  const { data: polizaPorEstadoData, isLoading: isLoadingPolizasPorEstado } =
    useGetPolizasPorEstadoQuery();
  const { data: polizasPorVencerData, isLoading: isLoadingPolizasPorVencer } =
    useGetPolizasPorVencerQuery(dayjs().format("YYYY-MM-DD"));

  return (
    <PageLayout>
      <h1>Reportes</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Clientes en Mora" key="1">
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <TablaClientesConMora
                data={clientesData as Cliente[]}
                isLoading={isLoadingClientes}
              />
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Polizas por estados" key="2">
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <TablaPolizasCanceladas
                data={polizaPorEstadoData as PolizaPorEstado}
                isLoading={isLoadingPolizasPorEstado}
              />
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Polizas vencidas" key="3">
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <TablaPolizasPorVencer
                data={polizasPorVencerData as VigenciaPoliza[]}
                isLoading={isLoadingPolizasPorVencer}
              />
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </PageLayout>
  );
};

export default ReportesPage;
