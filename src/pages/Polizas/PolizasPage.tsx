import { Button, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { useGetPolizasQuery } from '../../api/api';
import TablaPolizas from '../../components/tablas/TablaPolizas';

function PolizasPage() {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetPolizasQuery();
  const handleClick = () => {
    navigate('/polizas/registrar');
  };

  return (
    <PageLayout>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 20, offset: 2 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginBottom: '24px' }}
            onClick={handleClick}
          >
            Registrar nueva
          </Button>
          <TablaPolizas
            data={data || []}
            isLoading={isLoading}
            refetch={refetch}
          />
        </Col>
      </Row>
    </PageLayout>
  );
}

export default PolizasPage;
