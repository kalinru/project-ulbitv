import { useEffect } from 'react'

import { type PayloadAction, isRejected } from '@reduxjs/toolkit'
import { type AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import { $api } from '@/shared/api/api'
import { RoutePath } from '@/shared/consts/router'

import { listenerMiddleware } from '../providers/StoreProvider/config/store'

// MAYBE или добавить обработку ошибок redux middleware
export const useAppInterceptors = () => {
  const navigate = useNavigate()

  useEffect(() => {
    $api.interceptors.response.use(
      (response) => {
        return response
      },
      (error: AxiosError) => {
        if (error?.response?.status === 403) {
          // MAYBE в данном случаю лучше показать всплывающее уведомление
          navigate(RoutePath.forbidden(), { replace: true })
        }
        throw error
      },
    )

    listenerMiddleware.startListening({
      matcher: isRejected,
      effect: async (action: PayloadAction<any>, listenerApi) => {
        if (action?.payload?.status) {
          navigate(RoutePath.forbidden(), { replace: true })
        }
      },
    })
    // useNavigate is unstable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
