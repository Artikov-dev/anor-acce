import { $api } from './api'
import type { RegisterCredentials, UserProfile } from '@/types/auth'

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
