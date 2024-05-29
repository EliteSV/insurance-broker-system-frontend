import { Form, Input, Select, DatePicker, InputNumber, Typography } from 'antd';

const { Option } = Select;
const { Title } = Typography;

function PolizaIncendioForm() {
  return (
    <>
      <Title level={4}>Detalles de la propiedad</Title>
      <Form.Item
        label="Propietario"
        name={['detalles', 'propietario']}
        rules={[
          {
            required: true,
            message: 'Por favor, ingrese el nombre del propietario!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Dirección de la Propiedad"
        name={['detalles', 'direccion_propiedad']}
        rules={[
          {
            required: true,
            message: 'Por favor, ingrese la dirección de la propiedad!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Tipo de Propiedad"
        name={['detalles', 'tipo_propiedad']}
        rules={[
          {
            required: true,
            message: 'Por favor, seleccione el tipo de propiedad!',
          },
        ]}
      >
        <Select placeholder="Seleccione el tipo de propiedad">
          <Option value="casa">Casa</Option>
          <Option value="apartamento">Apartamento</Option>
          <Option value="comercial">Comercial</Option>
          <Option value="industrial">Industrial</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Valor Asegurado"
        name={['detalles', 'valor_asegurado']}
        rules={[
          { required: true, message: 'Por favor, ingrese el valor asegurado!' },
        ]}
      >
        <InputNumber min={0} style={{ width: '100%' }} addonBefore="$" />
      </Form.Item>

      <Form.Item
        label="Año de Construcción"
        name={['detalles', 'anio_construccion']}
        rules={[
          {
            required: true,
            message: 'Por favor, ingrese el año de construcción!',
          },
        ]}
      >
        <DatePicker picker="year" style={{ width: '100%' }} placeholder="Año" />
      </Form.Item>

      <Form.Item
        label="Materiales de Construcción"
        name={['detalles', 'materiales_construccion']}
        rules={[
          {
            required: true,
            message: 'Por favor, ingrese los materiales de construcción!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Sistemas de Seguridad"
        name={['detalles', 'sistemas_seguridad']}
      >
        <Input />
      </Form.Item>
    </>
  );
}

export default PolizaIncendioForm;
