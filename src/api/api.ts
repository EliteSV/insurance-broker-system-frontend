import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../constants';
import { axiosBaseQuery } from './axiosBaseQuery';
import { Aseguradora } from '../types/Aseguradora';
import { Cliente } from '../types/Cliente';
import { formatPoliza } from '../utils/utils';
import { Dashboard } from '../types/Dashboard';
import {
  PolizaPorEstado,
  VigenciaPoliza,
  RenovacionPoliza,
} from '../types/Poliza';
import { Usuario } from '../types/Usuario';
import { Rol } from '../types/Rol';
import dayjs from 'dayjs';

export const Api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: [
    'aseguradoras',
    'aseguradora',
    'clientes',
    'cliente',
    'polizas',
    'poliza',
    'pagos',
    'pago',
    'usuarios',
    'usuario',
    'roles',
    'dashboard',
    'reportes',
  ],
  endpoints: (builder) => ({
    getCSRFCookie: builder.query<string, void>({
      query: () => ({
        url: '/sanctum/csrf-cookie',
        method: 'GET',
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/login',
        method: 'POST',
        data: credentials,
      }),
    }),
    getLoggedUser: builder.query<Usuario, void>({
      query: () => ({
        url: '/api/user',
        method: 'GET',
      }),
    }),
    getAseguradoras: builder.query<Aseguradora[], void>({
      query: () => ({
        method: 'GET',
        url: `/api/aseguradoras`,
      }),
      providesTags: ['aseguradoras'],
    }),
    getAseguradora: builder.query<Aseguradora, number>({
      query: (id) => ({
        url: `/api/aseguradoras/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'aseguradora', id }],
    }),
    crearAseguradora: builder.mutation<Aseguradora, Partial<Aseguradora>>({
      query: (aseguradora) => ({
        url: `/api/aseguradoras`,
        method: 'POST',
        data: aseguradora,
      }),
      invalidatesTags: ['aseguradoras'],
    }),
    modificarAseguradora: builder.mutation<Aseguradora, Partial<Aseguradora>>({
      query: (aseguradora) => ({
        url: `/api/aseguradoras/${aseguradora.id}`,
        method: 'PUT',
        data: aseguradora,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'aseguradora', id },
        'aseguradoras',
      ],
    }),
    eliminarAseguradora: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/aseguradoras/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'aseguradora', id },
        'aseguradoras',
      ],
    }),
    getClientes: builder.query<Cliente[], void>({
      query: () => ({
        method: 'GET',
        url: `/api/clientes`,
      }),
      providesTags: ['clientes'],
    }),
    getCliente: builder.query<Cliente, number>({
      query: (id) => ({
        url: `/api/clientes/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'cliente', id }],
    }),
    crearCliente: builder.mutation<Cliente, FormData>({
      query: (cliente) => ({
        url: `/api/clientes`,
        method: 'POST',
        data: cliente,
      }),
      invalidatesTags: ['clientes'],
    }),
    modificarCliente: builder.mutation<Cliente, any>({
      query: ({ id, formData }) => ({
        url: `/api/clientes/${id}`,
        method: 'POST',
        data: formData,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'cliente', id },
        'clientes',
      ],
    }),
    eliminarCliente: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/clientes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'cliente', id },
        'clientes',
      ],
    }),
    getPolizas: builder.query<any, void>({
      query: () => ({
        method: 'GET',
        url: `/api/polizas`,
      }),
      providesTags: ['polizas'],
    }),
    getPoliza: builder.query<any, number>({
      query: (id) => ({
        url: `/api/polizas/${id}`,
        method: 'GET',
      }),
      transformResponse: (response) => formatPoliza(response),
      providesTags: (_result, _error, id) => [{ type: 'poliza', id }],
    }),
    crearPoliza: builder.mutation<any, any>({
      query: (poliza) => ({
        url: `/api/polizas`,
        method: 'POST',
        data: poliza,
      }),
      invalidatesTags: ['polizas'],
    }),
    modificarPoliza: builder.mutation<any, any>({
      query: (poliza) => ({
        url: `/api/polizas/${poliza.id}`,
        method: 'PUT',
        data: poliza,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'poliza', id },
        'polizas',
      ],
    }),
    eliminarPoliza: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/polizas/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'poliza', id },
        'polizas',
      ],
    }),
    getDashboard: builder.query<Dashboard, void>({
      query: () => ({
        method: 'GET',
        url: `/api/dashboard`,
      }),
      providesTags: ['dashboard'],
    }),
    getPagos: builder.query<any, void>({
      query: () => ({
        method: 'GET',
        url: `/api/pagos`,
      }),
      providesTags: ['pagos'],
    }),
    getPago: builder.query<any, number>({
      query: (id) => ({
        url: `/api/pagos/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'pago', id }],
    }),
    crearPago: builder.mutation<any, FormData>({
      query: (pago) => ({
        url: `/api/pagos`,
        method: 'POST',
        data: pago,
      }),
      invalidatesTags: ['pagos'],
    }),
    modificarPago: builder.mutation<any, any>({
      query: ({ id, formData }) => ({
        url: `/api/pagos/${id}`,
        method: 'POST',
        data: formData,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'pago', id },
        'pagos',
      ],
    }),
    eliminarPago: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/pagos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'pago', id }, 'pagos'],
    }),
    getClientesConMora: builder.query<Cliente[], void>({
      query: () => ({
        method: 'GET',
        url: `/api/reportes/clientes-con-mora`,
      }),
      providesTags: ['reportes'],
    }),
    getPolizasPorEstado: builder.query<PolizaPorEstado, void>({
      query: () => ({
        method: 'GET',
        url: `/api/reportes/polizas-por-estado`,
      }),
      providesTags: ['reportes'],
    }),
    getPolizasPorVencer: builder.query<VigenciaPoliza[], number>({
      query: (weeks) => ({
        url: `/api/polizas-vencimiento?weeks=${weeks}`,
        method: 'GET',
      }),
      providesTags: ['reportes'],
      transformResponse: (response: any) => {
        const vigencias = response.map((vigencia: VigenciaPoliza) => ({
          ...vigencia,
          fecha_inicio: dayjs(vigencia.fecha_inicio).format('DD/MM/YYYY'),
          fecha_vencimiento: dayjs(vigencia.fecha_vencimiento).format(
            'DD/MM/YYYY'
          ),
        }));
        return vigencias;
      },
    }),
    getUsuarios: builder.query<Usuario[], void>({
      query: () => ({
        method: 'GET',
        url: `/api/usuarios`,
      }),
      providesTags: ['usuarios'],
    }),
    getUsuario: builder.query<Usuario, number>({
      query: (id) => ({
        url: `/api/usuarios/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'usuario', id }],
    }),
    crearUsuario: builder.mutation<Usuario, FormData>({
      query: (usuario) => ({
        url: `/api/usuarios`,
        method: 'POST',
        data: usuario,
      }),
      invalidatesTags: ['usuarios'],
    }),
    modificarUsuario: builder.mutation<Usuario, { id: number; data: Usuario }>({
      query: ({ id, data }) => ({
        url: `/api/usuarios/${id}`,
        method: 'PUT',
        data: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'usuario', id },
        'usuarios',
      ],
    }),
    eliminarUsuario: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/usuarios/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'usuario', id },
        'usuarios',
      ],
    }),
    getRoles: builder.query<Rol[], void>({
      query: () => ({
        method: 'GET',
        url: `/api/roles`,
      }),
      providesTags: ['roles'],
    }),
    eliminarDocumentosCliente: builder.mutation<void, { urls: string[] }>({
      query: (body) => ({
        url: `/api/archivos`,
        method: 'DELETE',
        data: body,
      }),
      invalidatesTags: ['cliente'],
    }),
    renovarPoliza: builder.mutation<VigenciaPoliza, RenovacionPoliza>({
      query: (renovacion) => ({
        url: `/api/renovacion`,
        method: 'POST',
        data: renovacion,
      }),
      invalidatesTags: ['polizas'],
    }),
    forgotPassword: builder.mutation<void, { email: string }>({
      query: (data) => ({
        url: '/api/forgot-password',
        method: 'POST',
        data,
      }),
    }),
    resetPassword: builder.mutation<void, { data: any }>({
      query: (data) => ({
        url: '/api/reset-password',
        method: 'POST',
        data,
      }),
    }),
    contabilidad: builder.query<any, void>({
      query: () => ({
        method: 'GET',
        url: `/api/contabilidad`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetLoggedUserQuery,
  useLazyGetLoggedUserQuery,
  useLazyGetCSRFCookieQuery,
  useGetAseguradorasQuery,
  useGetAseguradoraQuery,
  useCrearAseguradoraMutation,
  useModificarAseguradoraMutation,
  useEliminarAseguradoraMutation,
  useGetClientesQuery,
  useGetClienteQuery,
  useCrearClienteMutation,
  useModificarClienteMutation,
  useEliminarClienteMutation,
  useGetPolizasQuery,
  useGetPolizaQuery,
  useCrearPolizaMutation,
  useModificarPolizaMutation,
  useEliminarPolizaMutation,
  useGetPagosQuery,
  useGetPagoQuery,
  useCrearPagoMutation,
  useModificarPagoMutation,
  useEliminarPagoMutation,
  useGetDashboardQuery,
  useGetClientesConMoraQuery,
  useGetPolizasPorEstadoQuery,
  useGetPolizasPorVencerQuery,
  useGetUsuariosQuery,
  useGetUsuarioQuery,
  useCrearUsuarioMutation,
  useModificarUsuarioMutation,
  useEliminarUsuarioMutation,
  useGetRolesQuery,
  useRenovarPolizaMutation,
  useEliminarDocumentosClienteMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useContabilidadQuery,
} = Api;
