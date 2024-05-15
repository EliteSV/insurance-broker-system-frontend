import { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, UploadFile } from 'antd';

type ClienteFormProps = {
    requireDocs?: boolean;
    isLoading?: boolean;
    initialValues?: any;
    onFinish: (values: any) => void;
    submitText?: string;
}

function ClienteForm({ onFinish, isLoading, initialValues, requireDocs = true, submitText = 'Enviar' }: ClienteFormProps) {
    const [dui, setDui] = useState<UploadFile[]>([]);
    const [nit, setNit] = useState<UploadFile[]>([]);
    const [polizas, setPolizas] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    useEffect(() => form.resetFields(), [form, initialValues]);
    return (
        <Form
            name="registrarCliente"
            form={form}
            initialValues={initialValues}
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
                rules={[{ required: true, message: 'Por favor, ingresa tu número de teléfono.' }, {
                    pattern: /^(?:\d{8}|\d{4}-\d{4})$/,
                    message: 'Por favor, ingrese un número de teléfono válido',
                }]}
            >
                <Input placeholder='0000-0000' />
            </Form.Item>

            <Form.Item
                name="dui"
                label="DUI"
                rules={[{ required: true, message: 'Por favor, ingresa tu DUI.' }, {
                    pattern: /^[0-9]{8}-[0-9]{1}$/,
                    message: 'Por favor, ingrese un DUI válido',
                },]}
            >
                <Input placeholder='00000000-0' />
            </Form.Item>

            <Form.Item
                name="nit"
                label="NIT"
                rules={[{ required: true, message: 'Por favor, ingresa tu NIT.' }, {
                    pattern: /^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]{1}$/,
                    message: 'Por favor, ingrese un NIT válido',
                }]}
            >
                <Input placeholder='0000-000000-000-0' />
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
                rules={[{ required: requireDocs, message: 'Por favor, selecciona una imagen del DUI.' }]}
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
                rules={[{ required: requireDocs, message: 'Por favor, selecciona una imagen del NIT.' }]}
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
                rules={[{ required: requireDocs, message: 'Por favor, selecciona al menos una imagen de póliza.' }]}
            >
                <Upload multiple beforeUpload={(doc) => {
                    setPolizas([...polizas, doc]);
                    return false;
                }}>
                    <Button>Subir Pólizas</Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    {submitText}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ClienteForm