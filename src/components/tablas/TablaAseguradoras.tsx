import { Space, Table } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { Aseguradora } from '../../types/Aseguradora';

type TablaAseguradorasProps = {
  data: Aseguradora[];
  isLoading: boolean;
  onDelete: (id: number) => void;
};

function TablaAseguradoras({
  data,
  isLoading,
  onDelete,
}: TablaAseguradorasProps) {
  const columns: TableProps<Aseguradora>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      hidden: true,
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
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/aseguradoras/${record.id}`}>
            <EyeOutlined />
          </Link>
          <Link to={`/aseguradoras/modificar/${record.id}`}>
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

export default TablaAseguradoras;
