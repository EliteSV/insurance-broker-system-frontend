import { useEffect } from "react";
import { LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select } from "antd";
import { useGetRolesQuery } from "../../api/api";

type UsuarioFormProps = {
  isLoading?: boolean;
  initialValues?: any;
  onFinish: (values: any) => void;
  submitText?: string;
  requiredPassword?: boolean;
};

function UsuarioForm({
  onFinish,
  isLoading,
  initialValues,
  requiredPassword,
  submitText = "Enviar",
}: UsuarioFormProps) {
  const [form] = Form.useForm();
  useEffect(() => form.resetFields(), [form, initialValues]);
  const { data } = useGetRolesQuery()

  return (
    <Form
      name="registrarUsuario"
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      scrollToFirstError
      layout="vertical"
    >
      <Form.Item
        name="nombre"
        label="Nombre"
        rules={[{ required: true, message: "Por favor, ingresa tu nombre." }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "¡El E-mail ingresado no es válido!",
          },
          {
            required: true,
            message: "Por favor, ingresa tu E-mail.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Clave"
        name="password"
        rules={[{ required: requiredPassword, message: "Por favor, ingrese una clave!" }
          , { min: 8, message: 'La contraseña debe tener al menos 8 caracteres' }

        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
      </Form.Item>
      <Form.Item label="Rol" name="rol_id"
        rules={[{ required: true, message: "Por favor, seleccione un rol!" }]}
      >
        <Select placeholder="Seleccione un rol">
          {
            data && data.map(rol => <Select.Option value={rol.id}>{rol.nombre}</Select.Option>)
          }
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UsuarioForm;