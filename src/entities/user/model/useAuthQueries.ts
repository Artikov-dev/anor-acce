import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { loginApi, getProfileApi, registerApi } from '../api/auth'
import { useAuthStore } from './useAuthStore'
import type {
  LoginCredentials,
  RegisterCredentials,
  UserProfile,
  AuthResponse,
} from './types'

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation<
    { authData: AuthResponse; profile: UserProfile },
    AxiosError<{ message?: string }>,
    LoginCredentials
  >({
    mutationFn: async (credentials: LoginCredentials) => {
      const authData = await loginApi(credentials)
      localStorage.setItem('access_token', authData.access_token)
      const profile = await getProfileApi()
      if (credentials.email === 'admin@mail.com') {
        profile.role = 'admin'
      }
      setAuth(authData.access_token, profile)
      return { authData, profile }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
}

export const useRegisterMutation = () => {
  return useMutation<
    UserProfile,
    AxiosError<{ message?: string }>,
    RegisterCredentials
  >({
    mutationFn: (credentials: RegisterCredentials) => registerApi(credentials),
  })
}

export const useProfileQuery = () => {
  const token = useAuthStore((state) => state.token)
  const storedUser = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  return useQuery<UserProfile | null>({
    queryKey: ['profile', token],
    queryFn: async () => {
      if (!token) {
        return null
      }
      try {
        const profile = await getProfileApi()
        if (
          storedUser?.email === 'admin@mail.com' ||
          profile.email === 'admin@mail.com'
        ) {
          profile.role = 'admin'
        }
        setUser(profile)
        return profile
      } catch {
        return storedUser || null
      }
    },
    enabled: !!token,
    retry: false,
    staleTime: 1000 * 60 * 5,
  })
}

export const useProfile = useProfileQuery

export const useLogout = () => {
  const queryClient = useQueryClient()
  const logoutStore = useAuthStore((state) => state.logout)

  return () => {
    logoutStore()
    queryClient.clear()
  }
}
