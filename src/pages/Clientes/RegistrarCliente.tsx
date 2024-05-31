import { Col, Row, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import ClienteForm from '../../components/forms/ClienteForm';
import { useCrearClienteMutation } from '../../api/api';
import { ButtonRegresar } from '../../components/common';
import { clienteToFormData } from '../../utils/utils';

const RegistrarCliente = () => {
  const navigate = useNavigate();
  const [crearCliente, crearClienteResult] = useCrearClienteMutation();

  const onFinish = (values: any) => {
    const formData = clienteToFormData(values);
    crearCliente(formData)
      .unwrap()
      .then(() => {
        message.success('Cliente registrado exitosamente.');
        navigate('/clientes');
      })
      .catch((error) => {
        message.error('Ocurrió un error al registrar el cliente.');
        const errorMessage = error?.data?.error || '';
        if (errorMessage.includes('dui has already been taken')) {
          message.warning('El DUI ya está registrado.');
        } else if (errorMessage.includes('nit has already been taken')) {
          message.warning('El NIT ya está registrado.');
        }
      });
  };

  return (
    <PageLayout>
      <Row align="middle" style={{ marginTop: '64px' }}>
        <Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
          <ButtonRegresar />
          <ClienteForm
            onFinish={onFinish}
            isLoading={crearClienteResult.isLoading}
            submitText="Registrar"
          />
        </Col>
      </Row>
    </PageLayout>
  );
};

export default RegistrarCliente;
