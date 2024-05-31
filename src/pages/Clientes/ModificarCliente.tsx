import { Row, Col, Typography, Spin, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { useGetClienteQuery, useModificarClienteMutation } from '../../api/api';
import ClienteForm from '../../components/forms/ClienteForm';
import { ButtonRegresar } from '../../components/common';
import DocumentList from '../../components/common/DocumentList';
import { clienteToFormData } from '../../utils/utils';

const { Title } = Typography;

const ModificarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: cliente, isLoading } = useGetClienteQuery(Number(id));
  const [modificar, modificarResult] = useModificarClienteMutation();
  const onFinish = (values: any) => {
    const formData = clienteToFormData(values, 'PUT');
    modificar({ id: Number(id), formData })
      .unwrap()
      .then(() => {
        message.success('Cliente modificado con éxito.');
        navigate('/clientes');
      })
      .catch(() => {
        message.error('Ocurrió un error al modificar el cliente.');
      });
  };

  return (
    <PageLayout>
      <Row>
        <Col xs={{ span: 22, offset: 1 }} lg={{ span: 8, offset: 4 }}>
          <ButtonRegresar />
          <Title level={2}>Modificar Cliente</Title>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 22, offset: 1 }} lg={{ span: 8, offset: 4 }}>
          <Spin spinning={isLoading}>
            <ClienteForm
              initialValues={cliente}
              onFinish={onFinish}
              submitText="Modificar"
              requireDocs={false}
              isLoading={modificarResult.isLoading}
            />
          </Spin>
        </Col>
        <Col xs={{ span: 22, offset: 1 }} lg={{ span: 8 }}>
          <DocumentList
            documents={cliente?.documentos || []}
            title="Documentos"
            allowDelete
          />
        </Col>
      </Row>
    </PageLayout>
  );
};

export default ModificarCliente;
