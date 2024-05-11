import { createApi } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../constants'
import { axiosBaseQuery } from './axiosBaseQuery'


export const Api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
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
  }),
})

export const { useLoginMutation, useLazyGetCSRFCookieQuery } = Api