import axios from 'axios'
import { USER_LOCAL_STORAGE_KEY } from 'shared/consts/localStorage'

export const $api = axios.create({
  baseURL: __API__,
  headers: {
    // FIXME после разлогинивания все равно отправляется заголовок (из localStorage удаляется)
    authorization: localStorage.getItem(USER_LOCAL_STORAGE_KEY) ?? ''
  }
})
