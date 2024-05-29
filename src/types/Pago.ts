import { VigenciaPoliza } from './Poliza';

export type Pago = {
  id: number;
  cuota: number;
  cantidad: number;
  fecha_vencimiento: string;
  fecha_pagado: string;
  estado: EstadoPago;
  comprobante: string;
  vigencia_poliza_id: number;
  vigencia?: VigenciaPoliza;
  poliza_id?: number;
};

export enum EstadoPago {
  Pendiente = 'Pendiente',
  Pagado = 'Pagado',
  Vencido = 'Vencido',
}
