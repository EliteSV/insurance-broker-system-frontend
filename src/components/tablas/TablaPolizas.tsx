import { useState } from 'react';
import { Modal, Space, Table, message } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  useEliminarPolizaMutation,
  useRenovarPolizaMutation,
  useGetAseguradorasQuery,
} from '../../api/api';
import { PolizaConDetalles } from '../../types/Poliza';
import { cuotasToFormaDePago } from '../../utils/utils';
import { getEstadoPolizaTag } from '../../utils/tags';

type TablaPolizasProps = {
  data: PolizaConDetalles[];
  isLoading: boolean;
  refetch?: () => void;
  showGanancias?: boolean;
};

function TablaPolizas({
  data,
  isLoading,
  refetch,
  showGanancias,
}: TablaPolizasProps) {
  const { data: aseguradoras } = useGetAseguradorasQuery();
  const [eliminarPoliza] = useEliminarPolizaMutation();
  const [renovarPoliza] = useRenovarPolizaMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const [nombre, setNombre] = useState<string | null>(null);

  const handleDeleteOpen = (id: number) => {
    setIsModalOpen(true);
    setId(id);
  };

  const handleRenewOpen = (id: number, nombre: string) => {
    setIsRenewModalOpen(true);
    setId(id);
    setNombre(nombre);
  };

  const handleRenewOk = () => {
    if (id) {
      const fecha_inicio = dayjs().format('YYYY-MM-DD');
      const fecha_vencimiento = dayjs().add(1, 'year').format('YYYY-MM-DD');
      renovarPoliza({ poliza_id: id, fecha_inicio, fecha_vencimiento })
        .unwrap()
        .then(() => {
          message.success(`Poliza ${nombre} renovada por un año más.`);
          refetch?.();
        })
        .catch(() => {
          message.error('Error al renovar la poliza');
        });
    }
    setIsRenewModalOpen(false);
  };

  const handleRenewCancel = () => {
    setIsRenewModalOpen(false);
  };

  const handleDeleteOk = () => {
    if (id) {
      eliminarPoliza(id)
        .unwrap()
        .then(() => {
          message.success('Poliza eliminada correctamente');
          refetch?.();
        })
        .catch(() => {
          message.error('Error al eliminar la poliza');
        });
    }
    setIsModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false);
  };
  const columns: TableProps<PolizaConDetalles>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      hidden: true,
    },
    {
      title: 'Codigo',
      dataIndex: 'codigo',
      key: 'codigo',
      sorter: (a, b) => a.codigo.localeCompare(b.codigo),
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      responsive: ['lg'],
    },
    {
      title: 'Monto',
      dataIndex: 'monto',
      key: 'monto',
      responsive: ['md'],
    },
    {
      title: 'Cuotas',
      dataIndex: 'cuotas',
      key: 'cuotas',
      render: (cuotas) => cuotasToFormaDePago(cuotas),
      responsive: ['md'],
    },
    {
      title: 'Aseguradora',
      dataIndex: ['aseguradora', 'nombre'],
      key: 'aseguradora',
      responsive: ['lg'],
      filters: aseguradoras?.map((aseguradora) => ({
        text: aseguradora.nombre,
        value: aseguradora.nombre,
      })),
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) =>
        record.aseguradora.nombre.startsWith(value as string),
      hidden: showGanancias,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado) => getEstadoPolizaTag(estado),
    },
    {
      title: 'Ganancia',
      dataIndex: 'ganancia',
      key: 'ganancia',
      render: (value) =>
        Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value),
      hidden: !showGanancias,
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/polizas/${record.id}`}>
            <EyeOutlined />
          </Link>
          <Link to={`/polizas/modificar/${record.id}`}>
            <EditOutlined />
          </Link>
          <a onClick={() => handleDeleteOpen(record.id)}>
            <DeleteOutlined />{' '}
          </a>
          {record.estado === 'Expirada' && (
            <a onClick={() => handleRenewOpen(record.id, record.nombre)}>
              <ReloadOutlined />
            </a>
          )}
        </Space>
      ),
      hidden: showGanancias,
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
        title="Eliminar poliza"
        open={isModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        okText="Si"
        cancelText="No"
      >
        <p>Desea eliminar la poliza?</p>
      </Modal>
      <Modal
        title="Renovar poliza"
        open={isRenewModalOpen}
        onOk={handleRenewOk}
        onCancel={handleRenewCancel}
        okText="Si"
        cancelText="No"
      >
        <p>
          Está a punto de renovar la poliza {nombre} por un año más, ¿está de
          acuerdo?
        </p>
      </Modal>
    </>
  );
}

export default TablaPolizas;
