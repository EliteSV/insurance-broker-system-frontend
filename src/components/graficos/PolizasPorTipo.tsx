import { Pie } from '@ant-design/charts';

function PolizasPorTipo() {
    const data = [
        { type: 'Automóvil', value: 27 },
        { type: 'Incendio', value: 18 },
        { type: 'Médico', value: 35 },
        { type: 'Vida', value: 20 },
    ];

    const config = {
        appendPadding: 8,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        interactions: [{ type: 'element-active' }],
    };

    return (
        <Pie {...config} />
    )
}

export default PolizasPorTipo