import { Rol } from "./Rol";

export type Usuario = {
    id: number;
    nombre: string;
    email: string;
    rol: Rol;
    created_at: string;
    updated_at: string;
}