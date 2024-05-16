export type Poliza = {
    id: number;
    nombre: string;
    estado: string;
    monto: number;
    cuotas: number;
    detalles: any;
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