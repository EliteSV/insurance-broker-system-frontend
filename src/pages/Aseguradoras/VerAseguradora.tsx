import { Row, Col, Card } from 'antd';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { useGetAseguradoraQuery } from '../../api/api';
import { ButtonRegresar } from '../../components/common';

const VerAseguradora = () => {
  const { id } = useParams();
  const { data: aseguradora, isLoading } = useGetAseguradoraQuery(Number(id));

  return (
    <PageLayout>
      <Row align="middle" style={{ marginTop: '64px' }}>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <ButtonRegresar />
          <Card title={aseguradora?.nombre} loading={isLoading}>
            <Card type="inner" title="Dirección">
              {aseguradora?.direccion}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Telefono">
              {aseguradora?.telefono}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Email">
              {aseguradora?.email}
            </Card>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default VerAseguradora;
