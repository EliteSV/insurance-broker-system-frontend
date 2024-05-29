import { Documento } from './Documento';

export type Cliente = {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  dui: string;
  nit: string;
  documentos: Documento[];
};
