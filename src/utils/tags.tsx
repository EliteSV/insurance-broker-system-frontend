import { Tag } from 'antd';
import { EstadoPago } from '../types/Pago';
import { EstadoPoliza } from '../types/Poliza';

export const getEstadoPagoTag = (estado: EstadoPago) => {
  switch (estado) {
    case EstadoPago.Pendiente:
      return <Tag color="warning">Pendiente</Tag>;
    case EstadoPago.Pagado:
      return <Tag color="success">Pagado</Tag>;
    case EstadoPago.Vencido:
      return <Tag color="error">Vencido</Tag>;
    default:
      return <Tag color="default">{estado}</Tag>;
  }
};

export const getEstadoPolizaTag = (estado: EstadoPoliza) => {
  switch (estado) {
    case EstadoPoliza.Pendiente:
      return <Tag color="warning">Pendiente</Tag>;
    case EstadoPoliza.Vigente:
      return <Tag color="success">Vigente</Tag>;
    case EstadoPoliza.Vencida:
      return <Tag color="error">Vencida</Tag>;
    case EstadoPoliza.Expirada:
      return <Tag color="volcano">Expirada</Tag>;
    case EstadoPoliza.Cancelada:
      return <Tag color="magenta">Cancelada</Tag>;
    default:
      return <Tag color="default">{estado}</Tag>;
  }
};
