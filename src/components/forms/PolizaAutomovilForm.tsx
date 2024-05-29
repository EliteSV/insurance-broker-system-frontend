import { Form, Input, Select, DatePicker, InputNumber, Typography } from 'antd';

const { Option } = Select;
const { Title } = Typography;

function PolizaAutomovilForm() {
  return (
    <>
      <Title level={4}>Detalles del Vehículo</Title>
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
        label="Valor Asegurado"
        name={['detalles', 'valor_asegurado']}
        rules={[
          { required: true, message: 'Por favor, ingrese el valor asegurado!' },
        ]}
      >
        <InputNumber min={0} style={{ width: '100%' }} addonBefore="$" />
      </Form.Item>

      <Form.Item
        label="Tipo de Vehículo"
        name={['detalles', 'tipo_vehiculo']}
        rules={[
          {
            required: true,
            message: 'Por favor, seleccione el tipo de vehículo!',
          },
        ]}
      >
        <Select placeholder="Seleccione el tipo de vehículo">
          <Option value="carro">Carro</Option>
          <Option value="camion">Camión</Option>
          <Option value="moto">Bus</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Marca"
        name={['detalles', 'marca']}
        rules={[
          {
            required: true,
            message: 'Por favor, ingrese la marca del vehículo!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Modelo"
        name={['detalles', 'modelo']}
        rules={[
          {
            required: true,
            message: 'Por favor, ingrese el modelo del vehículo!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Número de Motor" name={['detalles', 'numero_motor']}>
        <Input />
      </Form.Item>

      <Form.Item label="Número de Chasis" name={['detalles', 'numero_chasis']}>
        <Input />
      </Form.Item>

      <Form.Item label="Capacidad" name={['detalles', 'capacidad']}>
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item
        label="Año de Fabricación"
        name={['detalles', 'anio_fabricacion']}
        rules={[
          {
            required: true,
            message: 'Por favor, ingrese el año de fabricación!',
          },
        ]}
      >
        <DatePicker picker="year" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Placa"
        name={['detalles', 'placa']}
        rules={[
          {
            required: true,
            message: 'Por favor, ingrese la placa del vehículo!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Color"
        name={['detalles', 'color']}
        rules={[
          {
            required: true,
            message: 'Por favor, seleccione el color del vehículo!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Combustible" name={['detalles', 'combustible']}>
        <Select placeholder="Seleccione el tipo de combustible">
          <Option value="gasolina">Gasolina</Option>
          <Option value="diesel">Diésel</Option>
          <Option value="electrico">Eléctrico</Option>
          <Option value="hibrido">Híbrido</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Toneladas" name={['detalles', 'toneladas']}>
        <InputNumber min={0.1} step={0.1} />
      </Form.Item>
    </>
  );
}

export default PolizaAutomovilForm;
