import { Column } from '@ant-design/charts';

const ClientesPorEstado = () => {
    const data = [
        { type: 'Al dia', value: 50, },
        { type: 'En mora', value: 15, },
    ];

    const config = {
        data,
        xField: 'type',
        yField: 'value',
        colorField: 'type',
        style: {
            fill: ({ type }: { type: string }) => (type === 'Al dia' ? '#3f8600' : '#cf1322'),
        }
    };

    return (
        <Column {...config} />
    );
};

export default ClientesPorEstado;
