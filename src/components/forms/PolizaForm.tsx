import { Form, Input, Button, Select, DatePicker, Divider, InputNumber } from 'antd';
import PolizaAutomovilForm from './PolizaAutomovilForm';
import PolizaIncendioForm from './PolizaIncendioForm';
import PolizaMedicoForm from './PolizaMedicoForm';
import PolizaVidaForm from './PolizaVidaForm';
import { TipoPoliza, EstadoPoliza } from '../../types/Poliza';
import { useEffect } from "react";
import { useGetAseguradorasQuery, useGetClientesQuery } from '../../api/api';
import { FormaDePago } from '../../types/Poliza';
import dayjs, { Dayjs } from "dayjs";
import { getLatestVigencia } from '../../utils/utils';

const { Option } = Select;
const { RangePicker } = DatePicker;

type Props = {
  isLoading?: boolean;
  initialValues?: any;
  onFinish: (values: any) => void;
  submitText?: string;
  showVigencia?: boolean;
  showEstado?: boolean;
}

function PolizaForm({ initialValues, isLoading, onFinish, submitText, showVigencia, showEstado }: Props) {
  const [form] = Form.useForm();
  const tipoPoliza = Form.useWatch('tipo_poliza_id', form);
  const { data: aseguradoras } = useGetAseguradorasQuery();
  const { data: clientes } = useGetClientesQuery();

  const handleChange = () => {
    form.setFieldsValue({ detalles: null });
  };

  const validateDateRange = (_: unknown, value: [Dayjs, Dayjs] | undefined) => {
    if (value && value.length === 2) {
      const startDate = dayjs(value[0]);
      const endDate = dayjs(value[1]);
      if (endDate.diff(startDate, "year", true) !== 1) {
        return Promise.reject(
          new Error(
            "La fecha de vencimiento debe ser exactamente un año después de la fecha de inicio."
          )
        );
      }
    }
    return Promise.resolve();
  };

  useEffect(() => {
    const latestVigencia = getLatestVigencia(initialValues?.vigencias);
    const vigencia: any = [null, null]
    if (latestVigencia) {
      vigencia[0] = dayjs(latestVigencia.fecha_inicio)
      vigencia[1] = dayjs(latestVigencia.fecha_vencimiento)
    }
    const defaultValues = {
      ...initialValues,
      vigencia,
    }
    form.setFieldsValue(defaultValues);
  }, [initialValues, form]);

  return (
    <Form
      name="polizaForm"
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
    >

      <Form.Item
        label="Código"
        name="codigo"
        rules={[{ required: true, message: 'Por favor ingrese el código.' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Nombre"
        name="nombre"
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
          <Option value={FormaDePago.Mensual}>Mensual</Option>
          <Option value={FormaDePago.Trimestral}>Trimestral</Option>
          <Option value={FormaDePago.Semestral}>Semestral</Option>
          <Option value={FormaDePago.Anual}>Anual</Option>
        </Select>
      </Form.Item>

      {showVigencia && (
        <Form.Item
          label="Vigencia"
          name="vigencia"
          rules={[
            {
              required: true,
              message: "Por favor, seleccione la fecha de inicio y fin.",
            },
            { validator: validateDateRange },
          ]}
        >
          <RangePicker placeholder={['Inicio', 'Vencimiento']} />
        </Form.Item>
      )}
      {showEstado && (
        <Form.Item
          label="Estado"
          name="estado"
          rules={[{ required: true, message: 'Por favor, seleccione el estado de la poliza' }]}
        >
          <Select placeholder="Seleccione el estado">
            <Option value={EstadoPoliza.Pendiente}>Pendiente</Option>
            <Option value={EstadoPoliza.Vigente}>Vigente</Option>
            <Option value={EstadoPoliza.Vencida}>Vencida</Option>
            <Option value={EstadoPoliza.Expirada}>Expirada</Option>
            <Option value={EstadoPoliza.Cancelada}>Cancelada</Option>
          </Select>
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
            <Option key={cliente.id} value={cliente.id}>{`${cliente.dui} | ${cliente.nombre}`}</Option>
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