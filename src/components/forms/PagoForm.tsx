import { Form, Upload, InputNumber, Button, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { EstadoPago } from '../../types/Pago';
import { useGetPolizasQuery } from '../../api/api';

const { Option } = Select;

type Props = {
  initialValues?: any;
  isLoading?: boolean;
  onFinish: (values: any) => void;
  submitText?: string;
};

const PagoForm = ({
  initialValues,
  isLoading,
  onFinish,
  submitText = 'Registrar',
}: Props) => {
  const [form] = Form.useForm();

  const { data: polizas } = useGetPolizasQuery();
  const [polizaId, setPolizaId] = useState<number | null>(null);

  useEffect(() => {
    form.resetFields();
    setPolizaId(initialValues?.poliza_id);
  }, [form, initialValues]);

  const onEstadoChange = (value: any) => {
    if (value !== EstadoPago.Pagado) {
      form.setFieldsValue({ fecha_pagado: null, comprobante: null });
    }
  };

  const onPolizaChange = (value: any) => {
    setPolizaId(value);
  };

  const polizaOptions = polizas?.map((poliza: any) => ({
    label: poliza.codigo,
    value: poliza.id,
  }));
  let vigenciaOptions = [];
  if (polizaId) {
    vigenciaOptions = polizas
      ?.find((poliza: any) => poliza.id === polizaId)
      ?.vigencias.map((vigencia: any) => {
        const fecha_inicio = dayjs(vigencia.fecha_inicio).format('DD/MM/YYYY');
        const fecha_vencimiento = dayjs(vigencia.fecha_vencimiento).format(
          'DD/MM/YYYY'
        );
        return {
          label: `${fecha_inicio} - ${fecha_vencimiento}`,
          value: vigencia.id,
        };
      });
  }

  const estado = Form.useWatch('estado', form);
  return (
    <Form
      form={form}
      name="pago_form"
      onFinish={onFinish}
      initialValues={initialValues}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
    >
      <Form.Item
        label="N° de Cuota"
        name="cuota"
        rules={[
          { required: true, message: 'Por favor, ingrese el numero de cuota!' },
        ]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Cantidad"
        name="cantidad"
        rules={[{ required: true, message: 'Por favor, ingrese la cantidad!' }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} addonBefore="$" />
      </Form.Item>

      <Form.Item
        label="Fecha de Vencimiento"
        name="fecha_vencimiento"
        rules={[
          {
            required: true,
            message: 'Por favor, seleccione la fecha de vencimiento!',
          },
        ]}
      >
        <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Estado"
        name="estado"
        rules={[
          { required: true, message: 'Por favor, seleccione el estado!' },
        ]}
      >
        <Select placeholder="Seleccione el estado" onChange={onEstadoChange}>
          <Option value={EstadoPago.Pendiente}>Pendiente</Option>
          <Option value={EstadoPago.Pagado}>Pagado</Option>
          <Option value={EstadoPago.Vencido}>Vencido</Option>
        </Select>
      </Form.Item>

      {estado === EstadoPago.Pagado && (
        <>
          <Form.Item label="Fecha Pagado" name="fecha_pagado">
            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="comprobante"
            label="Comprobante"
            rules={[
              {
                required: true,
                message: 'Por favor, selecciona una imagen del comprobante.',
              },
            ]}
          >
            <Upload beforeUpload={() => false}>
              <Button>Subir comprobante</Button>
            </Upload>
          </Form.Item>
        </>
      )}

      <Form.Item
        label="Poliza"
        name="poliza_id"
        rules={[{ required: true, message: 'Por favor, seleccione la poliza' }]}
      >
        <Select
          placeholder="Seleccione la poliza"
          showSearch
          options={polizaOptions}
          onChange={onPolizaChange}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label as any)?.toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>

      <Form.Item
        label="Vigencia"
        name="vigencia_poliza_id"
        rules={[
          { required: true, message: 'Por favor, seleccione la vigencia' },
        ]}
      >
        <Select
          placeholder="Seleccione la vigencia"
          options={vigenciaOptions}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PagoForm;
