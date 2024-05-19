import { Space, Table, } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { Poliza } from '../../types/Poliza';
import { getEstadoPolizaTag } from '../../utils/tags';

type TablaPolizasProps = {
    data: Poliza[];
    isLoading: boolean;
    onDelete: (id: number) => void;
};

function TablaPolizas({ data, isLoading, onDelete }: TablaPolizasProps) {
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
            responsive: ['md'],
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            render: (estado) => getEstadoPolizaTag(estado),
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/polizas/${record.id}`}><EyeOutlined /></Link>
                    <Link to={`/polizas/modificar/${record.id}`}><EditOutlined /></Link>
                    <a onClick={() => onDelete(record.id)}><DeleteOutlined /> </a>
                </Space>
            ),
        },
    ];
    return (
        <Table rowKey='id' columns={columns} dataSource={data} loading={isLoading} />
    )
}

export default TablaPolizas