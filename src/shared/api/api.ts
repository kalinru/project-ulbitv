import axios from 'axios'

import { USER_LOCAL_STORAGE_KEY } from '@/shared/consts/localStorage'

export const $api = axios.create({
  baseURL: __API__,
})

$api?.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization =
      localStorage.getItem(USER_LOCAL_STORAGE_KEY) ?? ''
  }
  return config
})

// TODO обработка ошибок статуса сервера (400, 401, 402, 403, 404..., 500...). Где должен быть обработчик (redux middleware?)? Как не дублировать с rtk.Query
