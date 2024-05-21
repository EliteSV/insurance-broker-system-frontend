export type Poliza = {
  id: number;
  codigo: string;
  nombre: string;
  estado: EstadoPoliza;
  monto: number;
  cuotas: number;
  detalles: PolizaAutomovil | PolizaIncendio | PolizaVida | PolizaMedico;
  cliente_id: number;
  aseguradora_id: number;
  tipo_poliza_id: number;
  vigencias: VigenciaPoliza[];
};

export type PolizaConDetalles = Poliza & {
  cliente: {
    nombre: string;
  };
  aseguradora: {
    nombre: string;
  };
  tipo_poliza: {
    nombre: string;
  };
};

export type VigenciaPoliza = {
  id: number;
  fecha_inicio: string;
  fecha_vencimiento: string;
  poliza_id: number;
  poliza: PolizaConDetalles;
};

export enum TipoPoliza {
  Incendio = 1,
  Automovil = 2,
  Medico = 3,
  Vida = 4,
}

export enum EstadoPoliza {
  Pendiente = 'Pendiente',
  Vigente = 'Vigente',
  Vencida = 'Vencida',
  Expirada = 'Expirada',
  Cancelada = 'Cancelada',
}

export enum FormaDePago {
    Anual = 1,
    Semestral = 2,
    Trimestral = 4,
    Mensual = 12,
}

export type PolizaAutomovil = {
  propietario: string;
  valor_asegurado: number;
  tipo_vehiculo: string;
  marca: string;
  modelo: string;
  numero_motor?: string;
  numero_chasis?: string;
  capacidad?: number;
  anio_fabricacion: string;
  placa: string;
  color: string;
  combustible?: string;
  toneladas?: number;
};

export type PolizaIncendio = {
  propietario: string;
  direccion_propiedad: string;
  tipo_propiedad: string;
  valor_asegurado: number;
  anio_construccion: string;
  materiales_construccion: string;
  sistemas_seguridad?: string;
};

export type PolizaVida = {
  nombre_asegurado: string;
  fecha_nacimiento: string;
  genero: string;
  numero_documento: string;
  valor_asegurado: number;
  beneficiarios: string;
};

export type PolizaMedico = {
  nombre_asegurado: string;
  fecha_nacimiento: string;
  genero: string;
  numero_documento: string;
  tipo_plan: string;
  valor_asegurado: number;
  coberturas_adicionales?: string;
};

export type PolizaPorEstado = {
  [key: string]: PolizaConDetalles[];
};

export type RenovacionPoliza = {
  poliza_id: number;
  fecha_inicio: string;
  fecha_vencimiento: string;
};

