import { RolEnum } from '../types/Rol';

export const isAdmin = (rol?: RolEnum) => {
  return rol === RolEnum.Admin;
};

export const isGerenteOrAdmin = (rol?: RolEnum) => {
  return rol === RolEnum.Admin || rol === RolEnum.Gerente;
};
