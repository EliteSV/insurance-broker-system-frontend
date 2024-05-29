import { Card, Statistic, Row, Col } from 'antd';

import {
  UserOutlined,
  InsuranceOutlined,
  SafetyOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import PageLayout from '../components/PageLayout';
import PolizasPorTipo from '../components/graficos/PolizasPorTipo';
import ClientesPorEstado from '../components/graficos/ClientesPorEstado';
import { useGetDashboardQuery } from '../api/api';

function HomePage() {
  const { data, isLoading } = useGetDashboardQuery();

  const {
    polizasVigentes = 0,
    polizasMora = 0,
    aseguradorasRegistradas = 0,
    totalClientes = 0,
    tiposDePolizas = {},
    clientesAlDia = 0,
    clientesMora = 0,
  } = data || {};

  return (
    <PageLayout>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
          <Card loading={isLoading}>
            <Statistic
              title="Polizas Vigentes"
              value={polizasVigentes}
              prefix={<InsuranceOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
          <Card loading={isLoading}>
            <Statistic
              title="Polizas Vencidas"
              value={polizasMora}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
          <Card loading={isLoading}>
            <Statistic
              title="Total de Aseguradoras"
              value={aseguradorasRegistradas}
              prefix={<SafetyOutlined />}
            />
          </Card>
        </Col>
        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
          <Card loading={isLoading}>
            <Statistic
              title="Total de Clientes"
              value={totalClientes}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Card title="Polizas por tipo" bordered={false} loading={isLoading}>
            <PolizasPorTipo data={tiposDePolizas} />
          </Card>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Card title="Estado de Clientes" bordered={false} loading={isLoading}>
            <ClientesPorEstado data={{ clientesAlDia, clientesMora }} />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  );
}

export default HomePage;
