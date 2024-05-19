import { useEffect } from 'react'
import { Form, Input, Button } from 'antd';

type Props = {
    initialValues?: any
    isLoading?: boolean
    onFinish: (values: any) => void
    submitText?: string
}


function AseguradorasForm({ initialValues, onFinish, isLoading, submitText = 'Enviar' }: Props) {
    const [form] = Form.useForm();
    useEffect(() => form.resetFields(), [form, initialValues]);
    return (
        <Form
            form={form}
            name="aseguradoraForm"
            initialValues={initialValues}
            onFinish={onFinish}
            scrollToFirstError
            layout="vertical"
        >
            <Form.Item
                name="nombre"
                label="Nombre"
                rules={[{ required: true, message: 'Por favor, ingresa el nombre.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="direccion"
                label="Direccion"
                rules={[
                    {
                        required: true,
                        message: 'Por favor, ingresa la dirección.',
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                name="telefono"
                label="Teléfono"
                rules={[{ required: true, message: 'Por favor, ingresa tu número de teléfono.' }]}
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        type: 'email',
                        message: 'El email no es válido.',
                    },
                    {
                        required: true,
                        message: 'Por favor, ingresa tu email.',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    {submitText}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AseguradorasForm