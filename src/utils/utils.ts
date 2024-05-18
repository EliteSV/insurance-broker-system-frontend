import dayjs from 'dayjs'
import { TipoPoliza } from '../types/Poliza';

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