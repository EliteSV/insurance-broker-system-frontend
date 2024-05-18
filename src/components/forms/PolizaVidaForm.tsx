import { Form, Input, DatePicker, InputNumber, Radio, Typography } from 'antd';

const { Title } = Typography;

function PolizaVida() {
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
                label="Valor Asegurado"
                name={['detalles', 'valor_asegurado']}
                rules={[{ required: true, message: 'Por favor, ingrese el valor asegurado!' }]}
            >
                <InputNumber min={0} style={{ width: '100%' }} addonBefore="$" />
            </Form.Item>

            <Form.Item
                label="Beneficiarios"
                name={['detalles', 'beneficiarios']}
                rules={[{ required: true, message: 'Por favor, ingrese los beneficiarios!' }]}
            >
                <Input.TextArea />
            </Form.Item>
        </>
    )
}

export default PolizaVida