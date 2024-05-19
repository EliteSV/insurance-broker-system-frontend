export type Rol = {
    id: number;
    nombre: string;
    created_at: string;
    updated_at: string;
}

export enum RolEnum {
    Admin = 1,
    Gerente = 2,
    Agente = 3,
}
