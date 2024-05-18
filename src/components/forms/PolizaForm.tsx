import { Form, Input, Button, Select, DatePicker, Divider, InputNumber } from 'antd';
import PolizaAutomovilForm from './PolizaAutomovilForm';
import PolizaIncendioForm from './PolizaIncendioForm';
import PolizaMedicoForm from './PolizaMedicoForm';
import PolizaVidaForm from './PolizaVidaForm';
import { TipoPoliza } from '../../types/Poliza';
import { useEffect } from 'react';
import { useGetAseguradorasQuery, useGetClientesQuery } from '../../api/api';

const { Option } = Select;
const { RangePicker } = DatePicker;

type Props = {
    isLoading?: boolean;
    initialValues?: any;
    onFinish: (values: any) => void;
    submitText?: string;
    showVigencia?: boolean;
}

function PolizaForm({ initialValues, isLoading, onFinish, submitText, showVigencia }: Props) {
    const [form] = Form.useForm();
    useEffect(() => form.resetFields(), [form, initialValues]);
    const tipoPoliza = Form.useWatch('tipo_poliza_id', form);
    const { data: aseguradoras } = useGetAseguradorasQuery();
    const { data: clientes } = useGetClientesQuery();

    const handleChange = () => {
        form.setFieldsValue({ detalles: null });
    };

    return (
        <Form
            name="polizaForm"
            form={form}
            initialValues={initialValues}
            onFinish={onFinish}
        >
            <Form.Item
                label="Nombre"
                name="nombre"
                rules={[{ required: true, message: 'Por favor ingrese el nombre.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Monto"
                name="monto"
                rules={[{ required: true, message: 'Por favor ingrese el monto.' }]}
            >
                <InputNumber addonBefore="$" />
            </Form.Item>

            <Form.Item
                label="Cuotas"
                name="cuotas"
                rules={[{ required: true, message: 'Por favor, seleccione el numero de cuotas' }]}
            >
                <Select placeholder="Seleccione la opcion de pago">
                    <Option value={12}>Mensual</Option>
                    <Option value={4}>Trimestral</Option>
                    <Option value={2}>Semestral</Option>
                    <Option value={1}>Anual</Option>
                </Select>
            </Form.Item>

            {showVigencia && (
                <Form.Item
                    label="Vigencia"
                    name="vigencia"
                    rules={[{ required: true, message: 'Por favor, seleccione la fecha de inicio y fin.' }]}
                >
                    <RangePicker placeholder={['Inicio', 'Vencimiento']} />
                </Form.Item>
            )}
            <Form.Item
                label="Tipo de Poliza"
                name="tipo_poliza_id"
                rules={[{ required: true, message: 'Por favor, seleccione el tipo de poliza' }]}
            >
                <Select placeholder="Seleccione el tipo" onChange={handleChange}>
                    <Option value={TipoPoliza.Incendio}>Incendio</Option>
                    <Option value={TipoPoliza.Automovil}>Automovil</Option>
                    <Option value={TipoPoliza.Medico}>Medico</Option>
                    <Option value={TipoPoliza.Vida}>Vida</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Aseguradora"
                name="aseguradora_id"
                rules={[{ required: true, message: 'Por favor, seleccione la aseguradora' }]}
            >
                <Select placeholder="Seleccione la aseguradora">
                    {aseguradoras?.map(aseguradora => (
                        <Option key={aseguradora.id} value={aseguradora.id}>{aseguradora.nombre}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Cliente"
                name="cliente_id"
                rules={[{ required: true, message: 'Por favor, seleccione el cliente' }]}
            >
                <Select placeholder="Seleccione el cliente" showSearch filterOption optionFilterProp="children">
                    {clientes?.map(cliente => (
                        <Option key={cliente.id} value={cliente.id}>{`${cliente.id} | ${cliente.nombre}`}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Divider />
            {tipoPoliza === TipoPoliza.Incendio && (<PolizaIncendioForm />)}
            {tipoPoliza === TipoPoliza.Automovil && (<PolizaAutomovilForm />)}
            {tipoPoliza === TipoPoliza.Medico && (<PolizaMedicoForm />)}
            {tipoPoliza === TipoPoliza.Vida && (<PolizaVidaForm />)}

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    {submitText}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default PolizaForm