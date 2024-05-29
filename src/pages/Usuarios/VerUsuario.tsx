import { Row, Col, Card } from 'antd';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { useGetUsuarioQuery } from '../../api/api';
import { formatDate } from '../../utils/utils';
import { ButtonRegresar } from '../../components/common';

const VerUsuario = () => {
  const { id } = useParams();
  const { data: usuario, isLoading } = useGetUsuarioQuery(Number(id));

  return (
    <PageLayout>
      <Row align="middle" style={{ marginTop: '64px' }}>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <ButtonRegresar />
          <Card title={usuario?.nombre} loading={isLoading}>
            <Card style={{ marginTop: 16 }} type="inner" title="Email">
              {usuario?.email}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Rol">
              {usuario?.rol?.nombre}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Creado">
              {formatDate(usuario?.created_at)}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Actualizado">
              {formatDate(usuario?.updated_at)}
            </Card>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default VerUsuario;
