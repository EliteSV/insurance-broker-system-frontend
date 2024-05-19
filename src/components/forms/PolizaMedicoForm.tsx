import { Form, Input, Select, DatePicker, InputNumber, Radio, Typography } from 'antd';

const { Option } = Select;
const { Title } = Typography;

function PolizaMedico() {
    return (
        <>
            <Title level={4}>Detalles del Asegurado</Title>
            <Form.Item
                label="Nombre del Asegurado"
                name={['detalles', 'nombre_asegurado']}
                rules={[{ required: true, message: 'Por favor, ingrese el nombre del asegurado!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Fecha de Nacimiento"
                name={['detalles', 'fecha_nacimiento']}
                rules={[{ required: true, message: 'Por favor, ingrese la fecha de nacimiento!' }]}
            >
                <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                label="Género"
                name={['detalles', 'genero']}
                rules={[{ required: true, message: 'Por favor, seleccione el género!' }]}
            >
                <Radio.Group>
                    <Radio value="male">Masculino</Radio>
                    <Radio value="female">Femenino</Radio>
                    <Radio value="other">Otro</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="Número de Documento"
                name={['detalles', 'numero_documento']}
                rules={[{ required: true, message: 'Por favor, ingrese el número de documento!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Tipo de Plan"
                name={['detalles', 'tipo_plan']}
                rules={[{ required: true, message: 'Por favor, seleccione el tipo de plan!' }]}
            >
                <Select placeholder="Seleccione el tipo de plan">
                    <Option value="basic">Básico</Option>
                    <Option value="standard">Estándar</Option>
                    <Option value="premium">Premium</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Coberturas Adicionales"
                name={['detalles', 'coberturas_adicionales']}
            >
                <Select mode="multiple" placeholder="Seleccione coberturas adicionales">
                    <Option value="dental">Dental</Option>
                    <Option value="vision">Visión</Option>
                    <Option value="maternity">Maternidad</Option>
                    <Option value="mentalHealth">Salud Mental</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Valor Asegurado"
                name={['detalles', 'valor_asegurado']}
                rules={[{ required: true, message: 'Por favor, ingrese el valor asegurado!' }]}
            >
                <InputNumber min={0} style={{ width: '100%' }} addonBefore="$" />
            </Form.Item>
        </>
    )
}

export default PolizaMedico