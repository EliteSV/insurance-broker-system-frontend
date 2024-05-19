import { Space, Table } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { Pago } from '../../types/Pago';
import dayjs from 'dayjs';
import { getEstadoPagoTag } from '../../utils/tags';

type TablaPagosProps = {
    data: Pago[];
    isLoading: boolean;
    onDelete: (id: number) => void;
};

function TablaPagos({ data, isLoading, onDelete }: TablaPagosProps) {
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
        },
        {
            title: 'Cuota',
            dataIndex: 'cuota',
            key: 'cuota',
        },
        {
            title: 'Cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
        },
        {
            title: 'Fecha vencimiento',
            dataIndex: 'fecha_vencimiento',
            key: 'fecha_vencimiento',
            render: (fecha: string) => dayjs(fecha).format('DD/MM/YYYY'),
            responsive: ['md'],
        },
        {
            title: 'Fecha pagado',
            dataIndex: 'fecha_pagado',
            key: 'fecha_pagado',
            render: (fecha: string) => fecha ? dayjs(fecha).format('DD/MM/YYYY') : null,
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
                    <Link to={`/pagos/${record.id}`}><EyeOutlined /></Link>
                    <Link to={`/pagos/modificar/${record.id}`}><EditOutlined /></Link>
                    <a onClick={() => onDelete(record.id)}><DeleteOutlined /> </a>
                </Space>
            ),
        },
    ];
    return (
        <Table rowKey='id' columns={columns} dataSource={data} loading={isLoading} />
    )
}

export default TablaPagos