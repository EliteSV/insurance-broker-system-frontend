import dayjs from 'dayjs'
import { TipoPoliza, FormaDePago } from '../types/Poliza';
import { Pago } from '../types/Pago';
import { EstadoPago } from '../types/Pago';

export function formatPoliza(poliza: any) {
 const formattedPoliza = poliza;
  if (formattedPoliza.tipo_poliza_id === TipoPoliza.Automovil) {
    formattedPoliza.detalles = {
      ...formattedPoliza.detalles,
      anio_fabricacion: dayjs(formattedPoliza.detalles.anio_fabricacion)
    }
  }
  if (formattedPoliza.tipo_poliza_id === TipoPoliza.Vida || formattedPoliza.tipo_poliza_id === TipoPoliza.Medico) {
    formattedPoliza.detalles = {
      ...formattedPoliza.detalles,
      fecha_nacimiento: dayjs(formattedPoliza.detalles.fecha_nacimiento)
    }
  }

  if (formattedPoliza.tipo_poliza_id === TipoPoliza.Incendio) {
    formattedPoliza.detalles = {
      ...formattedPoliza.detalles,
      anio_construccion: dayjs(formattedPoliza.detalles.anio_construccion)
    }
  }
  return formattedPoliza;
}

export const formatPago = (pago?: Pago) => {
  if (!pago) return null
  return {
    ...pago,
    fecha_pagado: pago.fecha_pagado ? dayjs(pago.fecha_pagado) : null,
    fecha_vencimiento: dayjs(pago.fecha_vencimiento),
    poliza_id: pago.vigencia?.poliza_id
  }
}

export const pagoToFormData = (values: any, method: 'POST' | 'PUT' = 'POST') => {
  console.log(values)
  const formData = new FormData();
  if (method === 'PUT') {
    formData.append('_method', 'put');
  }
  formData.append('cuota', values.cuota);
  formData.append('cantidad', values.cantidad);
  formData.append('fecha_vencimiento', values.fecha_vencimiento);
  formData.append('estado', values.estado);
  formData.append('vigencia_poliza_id', values.vigencia_poliza_id);
  if (values.estado === EstadoPago.Pagado) {
      formData.append('fecha_pagado', values.fecha_pagado);
      formData.append(`comprobante`, values.comprobante.file);
  }
  return formData;
}

export const formatDate = (date: string | undefined): string =>{
  console.log(date)
  const dateValue = dayjs(date);
  return dateValue.format('DD-MM-YYYY HH:mm:ss');
}

export const cuotasToFormaDePago = (cuotas: number) => {
  switch (cuotas) {
    case FormaDePago.Anual:
      return 'Anual';
    case FormaDePago.Semestral:
      return 'Semestral';
    case FormaDePago.Trimestral:
      return 'Trimestral';
    case FormaDePago.Mensual:
      return 'Mensual';
    default:
      return '';
  }
}