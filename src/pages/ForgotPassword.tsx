import { Form, Input, Button, Card, Typography, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  useLazyGetCSRFCookieQuery,
  useForgotPasswordMutation,
} from '../api/api';
import PublicLayout from '../components/PublicLayout';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [getCSRFCookie] = useLazyGetCSRFCookieQuery();
  const [forgotPassword] = useForgotPasswordMutation();

  const onFinish = async (values: any) => {
    try {
      await getCSRFCookie().unwrap();
      await forgotPassword({ email: values.email }).unwrap();
      message.success(
        'Correo de restablecimiento de contraseña enviado, revisa tu correo'
      );
      navigate('/login');
    } catch (error) {
      message.error('Error al enviar el correo de restablecimiento');
    }
  };

  return (
    <PublicLayout>
      <Row align="middle" style={{ marginTop: '64px' }}>
        <Col
          xxl={{ span: 6, offset: 8 }}
          xl={{ span: 8, offset: 8 }}
          xs={{ span: 20, offset: 2 }}
        >
          <Card style={{ padding: '20px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>
              Restablecer contraseña
            </Title>
            <Form name="forgot_password" onFinish={onFinish} autoComplete="off">
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: '¡El E-mail ingresado no es válido!',
                  },
                  {
                    required: true,
                    message: 'Por favor, ingresa tu E-mail.',
                  },
                ]}
              >
                <Input placeholder="Correo electrónico" />
              </Form.Item>
              <Form.Item>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Enviar
                  </Button>
                  <Link to="/login" style={{ alignSelf: 'center' }}>
                    Volver a iniciar sesión
                  </Link>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </PublicLayout>
  );
};

export default ForgotPassword;
