import { NumericObject } from "./GlobalTypes";

export type Dashboard = {
  polizasVigentes: number;
  polizasMora: number;
  totalClientes: number;
  aseguradorasRegistradas: number;
  tiposDePolizas: NumericObject;
  clientesMora: number;
  clientesAlDia: number;
};
