import { $api } from './api'
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  UserProfile,
} from '@/types/auth'

export const loginApi = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await $api.post<AuthResponse>('auth/login', credentials)

  return response.data
}
export const getProfileApi = async (): Promise<UserProfile> => {
  const response = await $api.get<UserProfile>('/auth/profile')
  return response.data
}

export const registerApi = async (
  credentials: RegisterCredentials
): Promise<UserProfile> => {
  const response = await $api.post<UserProfile>('/users/', {
    name: credentials.name,
    email: credentials.email,
    password: credentials.password,
    avatar: credentials.avatar || 'https://picsum.photos/800',
  })
  return response.data
}
