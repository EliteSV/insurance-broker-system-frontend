import dayjs from 'dayjs';
import { maxBy } from 'lodash';
import { TipoPoliza, FormaDePago, VigenciaPoliza } from '../types/Poliza';
import { Pago } from '../types/Pago';
import { EstadoPago } from '../types/Pago';
import { TipoDocumento } from '../types/Documento';

export function formatPoliza(poliza: any) {
  const formattedPoliza = poliza;
  if (formattedPoliza.tipo_poliza_id === TipoPoliza.Automovil) {
    formattedPoliza.detalles = {
      ...formattedPoliza.detalles,
      anio_fabricacion: dayjs(formattedPoliza.detalles.anio_fabricacion),
    };
  }
  if (
    formattedPoliza.tipo_poliza_id === TipoPoliza.Vida ||
    formattedPoliza.tipo_poliza_id === TipoPoliza.Medico
  ) {
    formattedPoliza.detalles = {
      ...formattedPoliza.detalles,
      fecha_nacimiento: dayjs(formattedPoliza.detalles.fecha_nacimiento),
    };
  }

  if (formattedPoliza.tipo_poliza_id === TipoPoliza.Incendio) {
    formattedPoliza.detalles = {
      ...formattedPoliza.detalles,
      anio_construccion: dayjs(formattedPoliza.detalles.anio_construccion),
    };
  }
  return formattedPoliza;
}

export const formatPago = (pago?: Pago) => {
  if (!pago) return null;
  return {
    ...pago,
    fecha_pagado: pago.fecha_pagado ? dayjs(pago.fecha_pagado) : null,
    fecha_vencimiento: dayjs(pago.fecha_vencimiento),
    poliza_id: pago.vigencia?.poliza_id,
  };
};

export const pagoToFormData = (
  values: any,
  method: 'POST' | 'PUT' = 'POST'
) => {
  console.log(values);
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
};

export const clienteToFormData = (
  values: any,
  method: 'POST' | 'PUT' = 'POST'
) => {
  const formData = new FormData();
  if (method === 'PUT') {
    formData.append('_method', 'put');
  }
  formData.append('nombre', values.nombre);
  formData.append('email', values.email);
  formData.append('telefono', values.telefono);
  formData.append('direccion', values.direccion);
  formData.append('dui', values.dui);
  formData.append('nit', values.nit);
  let docIndex = 0;
  if (values.documentos_dui) {
    formData.append(
      `documentos[${docIndex}][file]`,
      values.documentos_dui.file
    );
    formData.append(
      `documentos[${docIndex}][tipo_documento_id]`,
      TipoDocumento.DUI.toString()
    );
    docIndex++;
  }
  if (values.documentos_nit) {
    formData.append(
      `documentos[${docIndex}][file]`,
      values.documentos_nit.file
    );
    formData.append(
      `documentos[${docIndex}][tipo_documento_id]`,
      TipoDocumento.NIT.toString()
    );
    docIndex++;
  }
  if (values.documentos_polizas) {
    for (let i = 0; i < values.documentos_polizas.fileList.length; i++) {
      formData.append(
        `documentos[${i + docIndex}][file]`,
        values.documentos_polizas.fileList[i].originFileObj
      );
      formData.append(
        `documentos[${i + docIndex}][tipo_documento_id]`,
        TipoDocumento.POLIZA.toString()
      );
    }
  }
  return formData;
};

export const formatDate = (date: string | undefined): string => {
  const dateValue = dayjs(date);
  return dateValue.format('DD-MM-YYYY HH:mm:ss');
};

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
};

export const getLatestVigencia = (vigencias: VigenciaPoliza[]) => {
  return maxBy(vigencias, 'created_at');
};
