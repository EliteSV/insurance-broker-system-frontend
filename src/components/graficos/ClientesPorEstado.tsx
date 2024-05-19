import { Column } from "@ant-design/charts";

type ClientesPorEstadoProps = {
  data: {
    clientesMora: number;
    clientesAlDia: number;
  };
};

const ClientesPorEstado = ({ data }: ClientesPorEstadoProps) => {
  const { clientesAlDia, clientesMora } = data;

  const chartData = [
    { type: "Al dia", value: clientesAlDia },
    { type: "En mora", value: clientesMora },
  ];

  const config = {
    data: chartData,
    xField: "type",
    yField: "value",
    colorField: "type",
    style: {
      fill: ({ type }: { type: string }) =>
        type === "Al dia" ? "#3f8600" : "#cf1322",
    },
  };

  return <Column {...config} />;
};

export default ClientesPorEstado;
