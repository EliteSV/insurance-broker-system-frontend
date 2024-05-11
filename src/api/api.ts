import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../constants'
import { RootState } from '../store/store'


export const Api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Accept', 'application/json')
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authentication', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation } = Api