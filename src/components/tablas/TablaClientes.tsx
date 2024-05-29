import { Space, Table } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { Cliente } from '../../types/Cliente';

type TablaClientesProps = {
  data: Cliente[];
  isLoading: boolean;
  onDelete: (id: number) => void;
};

function TablaClientes({ data, isLoading, onDelete }: TablaClientesProps) {
  const columns: TableProps<Cliente>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      hidden: true,
    },
    {
      title: 'DUI',
      dataIndex: 'dui',
      key: 'dui',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Dirección',
      dataIndex: 'direccion',
      key: 'direccion',
      responsive: ['lg'],
    },
    {
      title: 'Telefono',
      dataIndex: 'telefono',
      key: 'telefono',
      responsive: ['md'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['md'],
    },
    {
      title: 'NIT',
      dataIndex: 'nit',
      key: 'nit',
      responsive: ['lg'],
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/clientes/${record.id}`}>
            <EyeOutlined />
          </Link>
          <Link to={`/clientes/modificar/${record.id}`}>
            <EditOutlined />
          </Link>
          <a onClick={() => onDelete(record.id)}>
            <DeleteOutlined />{' '}
          </a>
        </Space>
      ),
    },
  ];
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={isLoading}
    />
  );
}

export default TablaClientes;
