import { Card, Statistic, Row, Col } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import PageLayout from '../components/PageLayout';
import { useContabilidadQuery } from '../api/api';
import TablaPolizas from '../components/tablas/TablaPolizas';

function ContabilidadPage() {
  const { data, isLoading } = useContabilidadQuery();
  const polizas = data?.polizas?.data || [];
  return (
    <PageLayout>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
          <Card loading={isLoading}>
            <Statistic
              title="Total ganacias"
              value={data?.totalGanancia}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <TablaPolizas
            data={polizas}
            isLoading={isLoading}
            showGanancias
            onDelete={() => {}}
            onRenew={() => {}}
          />
        </Col>
      </Row>
    </PageLayout>
  );
}

export default ContabilidadPage;
