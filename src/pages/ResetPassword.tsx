import { useParams, useNavigate } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";
import { useResetPasswordMutation } from "../api/api";
import { Form, Input, Button, Card, Typography, Row, Col, message } from "antd";
import PublicLayout from "../components/PublicLayout";

const { Title } = Typography;

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();

  const onFinish = async (data: any) => {
    if (data.password === data.password_confirmation) {
      const newData = { ...data, token: token };
      try {
        await resetPassword(newData).unwrap();
        message.success("Contraseña restablecida con éxito");
        navigate("/login");
      } catch (error) {
        message.error("Error al restablecer la contraseña");
      }
    } else {
      message.error("Las contraseñas no coinciden");
    }
  };

  return (
    <PublicLayout>
      <Row align="middle" style={{ marginTop: "64px" }}>
        <Col
          xxl={{ span: 6, offset: 8 }}
          xl={{ span: 8, offset: 8 }}
          xs={{ span: 20, offset: 2 }}
        >
          <Card style={{ padding: "20px" }}>
            <Title level={2} style={{ textAlign: "center" }}>
              Restablecer contraseña
            </Title>
            <Form name="reset_password" onFinish={onFinish} autoComplete="off">
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Por favor, ingrese su correo electrónico!" },
                  { type: "email", message: "El correo no es válido!" },
                ]}
              >
                <Input placeholder="Correo Electrónico" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Por favor, ingrese una clave!" },
                  {
                    min: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Contraseña"
                />
              </Form.Item>
              <Form.Item
                name="password_confirmation"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Por favor, confirme su clave!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Las contraseñas no coinciden")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirme su Contraseña"
                />
              </Form.Item>

              <Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Enviar
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </PublicLayout>
  );
};

export default ResetPassword;
