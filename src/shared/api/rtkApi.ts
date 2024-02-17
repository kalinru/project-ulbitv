import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { USER_LOCAL_STORAGE_KEY } from 'shared/consts/localStorage'

export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: header => {
      const token = localStorage.getItem(USER_LOCAL_STORAGE_KEY) ?? ''
      if (token) {
        header.set('Authorization', token)
      }
      return header
    }
  }),
  endpoints: (builder) => ({})
})
