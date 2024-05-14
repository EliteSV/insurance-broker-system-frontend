import { createApi } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../constants'
import { axiosBaseQuery } from './axiosBaseQuery'
import { Aseguradora } from '../types/Aseguradora'


export const Api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ['aseguradoras', 'aseguradora'],
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
      providesTags: (result, error, id) => [{ type: 'aseguradora', id }]
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
      invalidatesTags: (result, error, { id }) => [{ type: 'aseguradora', id}, 'aseguradoras'],
    }),
    eliminarAseguradora: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/aseguradoras/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'aseguradora', id }, 'aseguradoras'],
    }),
  }),
})

export const { useLoginMutation, useLazyGetCSRFCookieQuery, useGetAseguradorasQuery, useGetAseguradoraQuery, useCrearAseguradoraMutation, useModificarAseguradoraMutation, useEliminarAseguradoraMutation } = Api