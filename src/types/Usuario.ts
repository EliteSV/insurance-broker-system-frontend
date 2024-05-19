import { Rol } from "./Rol";

export type Usuario = {
    id: number;
    nombre: string;
    email: string;
    rol: Rol;
    rol_id: number;
    password: string;
    created_at: string;
    updated_at: string;
}
