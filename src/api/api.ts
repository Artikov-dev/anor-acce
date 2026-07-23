import axios from 'axios'
import { useAuthStore } from '@/store/useAuthStore'

export const $api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  timeout: 15_000,
})

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  const params = { ...config.params }

  if (params.search) {
    params.title = params.search
  }

  config.params = params

  return config
})

$api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  }
)
