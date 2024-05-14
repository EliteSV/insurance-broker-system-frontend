import { useState } from 'react';
import { Form, Input, Button, Upload, UploadFile } from 'antd';

type ClienteFormProps = {
    onFinish: (values: any) => void;
}

function ClienteForm({ onFinish }: ClienteFormProps) {
    const [dui, setDui] = useState<UploadFile[]>([]);
    const [nit, setNit] = useState<UploadFile[]>([]);
    const [polizas, setPolizas] = useState<UploadFile[]>([]);
    return (
        <Form
            name="registrarCliente"
            onFinish={onFinish}
            scrollToFirstError
            layout="vertical"
        >
            <Form.Item
                name="nombre"
                label="Nombre"
                rules={[{ required: true, message: 'Por favor, ingresa tu nombre.' }]}
            >
                <Input />
            </Form.Item>

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
                <Input />
            </Form.Item>

            <Form.Item
                name="telefono"
                label="Teléfono"
                rules={[{ required: true, message: 'Por favor, ingresa tu número de teléfono.' }]}
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                name="dui"
                label="DUI"
                rules={[{ required: true, message: 'Por favor, ingresa tu DUI.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="nit"
                label="NIT"
                rules={[{ required: true, message: 'Por favor, ingresa tu NIT.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="direccion"
                label="Dirección"
                rules={[{ required: true, message: 'Por favor, ingresa tu dirección.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="documentos_dui"
                label="DUI escaneado"
                rules={[{ required: true, message: 'Por favor, selecciona una imagen del DUI.' }]}
            >
                <Upload beforeUpload={(doc) => {
                    setDui([...dui, doc]);
                    return false;
                }}>
                    <Button>Subir DUI</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                name="documentos_nit"
                label="NIT escaneado"
                rules={[{ required: true, message: 'Por favor, selecciona una imagen del NIT.' }]}
            >
                <Upload beforeUpload={(doc) => {
                    setNit([...nit, doc]);
                    return false;
                }}>
                    <Button>Subir NIT</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                name="documentos_polizas"
                label="Pólizas escaneadas"
                rules={[{ required: true, message: 'Por favor, selecciona al menos una imagen de póliza.' }]}
            >
                <Upload multiple beforeUpload={(doc) => {
                    setPolizas([...polizas, doc]);
                    return false;
                }}>
                    <Button>Subir Pólizas</Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Registrar
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ClienteForm