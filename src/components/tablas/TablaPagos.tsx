import { Space, Table, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { Pago } from '../../types/Pago';
import dayjs from 'dayjs';
import { getEstadoPagoTag } from '../../utils/tags';
import { useEliminarPagoMutation, useGetPolizasQuery } from '../../api/api';

type TablaPagosProps = {
  data: Pago[];
  isLoading: boolean;
  showPoliza?: boolean;
  refetch?: () => void;
};

function TablaPagos({ data, isLoading, showPoliza, refetch }: TablaPagosProps) {
  const { data: polizas } = useGetPolizasQuery();
  const [eliminarPago, eliminarResult] = useEliminarPagoMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);

  const handleOpen = (id: number) => {
    setIsModalOpen(true);
    setId(id);
  };

  const handleOk = () => {
    if (!id) return;
    eliminarPago(id)
      .unwrap()
      .then(() => {
        message.success('Pago eliminado correctamente');
        refetch && refetch();
      })
      .catch(() => {
        message.error('Error al eliminar el pago');
      })
      .finally(() => {
        setIsModalOpen(false);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: TableProps<Pago>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      hidden: true,
    },
    {
      title: 'Poliza',
      dataIndex: ['vigencia', 'poliza', 'codigo'],
      key: 'vigencia.poliza.codigo',
      filters: polizas?.map((poliza: any) => ({
        text: poliza.codigo,
        value: poliza.codigo,
      })),
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) =>
        record.vigencia?.poliza.codigo.startsWith(value as string) || false,
      hidden: !showPoliza,
    },
    {
      title: 'Cuota',
      dataIndex: 'cuota',
      key: 'cuota',
      responsive: ['md'],
      sorter: (a, b) => a.cuota - b.cuota,
    },
    {
      title: 'Cantidad',
      dataIndex: 'cantidad',
      key: 'cantidad',
      responsive: ['md'],
    },
    {
      title: 'Fecha vencimiento',
      dataIndex: 'fecha_vencimiento',
      key: 'fecha_vencimiento',
      render: (fecha: string) => dayjs(fecha).format('DD/MM/YYYY'),
      responsive: ['md'],
      sorter: (a, b) =>
        dayjs(a.fecha_vencimiento).unix() - dayjs(b.fecha_vencimiento).unix(),
    },
    {
      title: 'Fecha pagado',
      dataIndex: 'fecha_pagado',
      key: 'fecha_pagado',
      render: (fecha: string) =>
        fecha ? dayjs(fecha).format('DD/MM/YYYY') : null,
      responsive: ['md'],
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado) => getEstadoPagoTag(estado),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/pagos/${record.id}`}>
            <EyeOutlined />
          </Link>
          <Link to={`/pagos/modificar/${record.id}`}>
            <EditOutlined />
          </Link>
          <a onClick={() => handleOpen(record.id)}>
            <DeleteOutlined />{' '}
          </a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={isLoading}
      />
      <Modal
        title="Eliminar pago"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Si"
        cancelText="No"
        confirmLoading={eliminarResult.isLoading}
      >
        <p>Desea eliminar el pago?</p>
      </Modal>
    </>
  );
}

export default TablaPagos;
