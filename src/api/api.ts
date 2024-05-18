import { createApi } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../constants'
import { axiosBaseQuery } from './axiosBaseQuery'
import { Aseguradora } from '../types/Aseguradora'
import { Cliente } from '../types/Cliente'

export const Api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ['aseguradoras', 'aseguradora', 'clientes', 'cliente', 'polizas', 'poliza'],
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
      providesTags: (_result, _error, id) => [{ type: 'aseguradora', id }]
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
      invalidatesTags: (_result, _error, { id }) => [{ type: 'aseguradora', id}, 'aseguradoras'],
    }),
    eliminarAseguradora: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/aseguradoras/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'aseguradora', id }, 'aseguradoras'],
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
      providesTags: (_result, _error, id) => [{ type: 'cliente', id }]
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
      query: ({id,formData}) => ({
        url: `/api/clientes/${id}`,
        method: 'POST',
        data: formData,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'cliente', id}, 'clientes'],
    }),
    eliminarCliente: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/clientes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'cliente', id }, 'clientes'],
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
      providesTags: (_result, _error, id) => [{ type: 'poliza', id }]
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
      invalidatesTags: (_result, _error, { id }) => [{ type: 'poliza', id}, 'polizas'],
    }),
    eliminarPoliza: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/polizas/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'poliza', id }, 'polizas'],
    }),
  }),
})

export const { 
  useLoginMutation, 
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
} = Api