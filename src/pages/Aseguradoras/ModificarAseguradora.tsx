import { Row, Col, Typography, Spin, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { Aseguradora } from '../../types/Aseguradora';
import {
  useGetAseguradoraQuery,
  useModificarAseguradoraMutation,
} from '../../api/api';
import AseguradorasForm from '../../components/forms/AseguradorasForm';
import { ButtonRegresar } from '../../components/common';

const { Title } = Typography;

const ModificarAseguradora = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: aseguradora, isLoading } = useGetAseguradoraQuery(Number(id));
  const [modificar, modificarResult] = useModificarAseguradoraMutation();
  const onFinish = (values: Partial<Aseguradora>) => {
    modificar({ id: Number(id), ...values })
      .unwrap()
      .then(() => {
        message.success('Aseguradora modificada con éxito.');
        navigate('/aseguradoras');
      })
      .catch(() => {
        message.error('Ocurrió un error al modificar la aseguradora.');
      });
  };

  return (
    <PageLayout>
      <Row align="middle" style={{ marginTop: '64px' }}>
        <Col xs={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 8 }}>
          <ButtonRegresar />
          <Title level={2}>Modificar Aseguradora</Title>
          <Spin spinning={isLoading}>
            <AseguradorasForm
              initialValues={aseguradora}
              onFinish={onFinish}
              submitText="Modificar"
              isLoading={modificarResult.isLoading}
            />
          </Spin>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default ModificarAseguradora;
