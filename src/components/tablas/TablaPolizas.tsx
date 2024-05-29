import { Space, Table } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { Poliza } from '../../types/Poliza';
import { cuotasToFormaDePago } from '../../utils/utils';
import { getEstadoPolizaTag } from '../../utils/tags';

type TablaPolizasProps = {
  data: Poliza[];
  isLoading: boolean;
  onDelete: (id: number) => void;
  onRenew: (id: number, nombre: string) => void;
  showGanancias?: boolean;
};

function TablaPolizas({ data, isLoading, onDelete, onRenew, showGanancias }: TablaPolizasProps) {
  const columns: TableProps<Poliza>['columns'] = [
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
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado) => getEstadoPolizaTag(estado),
    }, {
      title: 'Ganancia',
      dataIndex: 'ganancia',
      key: 'ganancia',
      render: (value) => Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value),
      hidden: !showGanancias,
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/polizas/${record.id}`}><EyeOutlined /></Link>
          <Link to={`/polizas/modificar/${record.id}`}><EditOutlined /></Link>
          <a onClick={() => onDelete(record.id)}><DeleteOutlined /> </a>
          {record.estado === 'Expirada' && <a onClick={() => onRenew(record.id, record.nombre)}><ReloadOutlined /></a>}
        </Space>
      ),
      hidden: showGanancias,
    },
  ];
  return (
    <Table rowKey='id' columns={columns} dataSource={data} loading={isLoading} />
  )
}

export default TablaPolizas;
