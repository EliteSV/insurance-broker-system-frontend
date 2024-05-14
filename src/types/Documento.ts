export type Documento = {
    id: number;
    url: string;
    cliente_id: number;
    tipo_documento_id: number;
    created_at: string;
    updated_at: string;
}

export enum TipoDocumento {
    DUI = 1,
    NIT = 2,
    POLIZA = 3,
}