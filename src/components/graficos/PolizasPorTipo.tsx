import { Pie } from "@ant-design/charts";
import { NumericObject } from "../../types/GlobalTypes";

type PolizaPorTipoProps = {
  data: NumericObject;
};

function PolizasPorTipo({ data }: PolizaPorTipoProps) {
  const transformedData = Object.entries(data).map(([type, value]) => ({
    type,
    value,
  }));

  const config = {
    appendPadding: 8,
    data: transformedData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    interactions: [{ type: "element-active" }],
  };

  return <Pie {...config} />;
}

export default PolizasPorTipo;
