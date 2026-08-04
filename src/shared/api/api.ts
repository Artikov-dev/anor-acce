import axios from 'axios'

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
    const token = localStorage.getItem('access_token')
    if (
      error.response?.status === 401 &&
      token &&
      token !== 'default-admin-token'
    ) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('auth-storage')
      window.dispatchEvent(new Event('auth:logout'))
    }
    return Promise.reject(error)
  }
)
