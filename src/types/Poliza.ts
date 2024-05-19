export type Poliza = {
    id: number;
    codigo: string;
    nombre: string;
    estado: string;
    monto: number;
    cuotas: number;
    detalles: PolizaAutomovil | PolizaIncendio | PolizaVida | PolizaMedico;
    cliente_id: number;
    aseguradora_id: number;
    tipo_poliza_id: number;
    vigencias: VigenciaPoliza[];
};

export type VigenciaPoliza = {
    id: number;
    fecha_inicio: string;
    fecha_vencimiento: string;
    poliza_id: number;  
}

export enum TipoPoliza {
    Incendio = 1,
    Automovil = 2,
    Medico = 3,
    Vida = 4,
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