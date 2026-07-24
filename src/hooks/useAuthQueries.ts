import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { loginApi, getProfileApi, registerApi } from '@/api/auth'
import { useAuthStore } from '@/store/useAuthStore'
import type {
  LoginCredentials,
  RegisterCredentials,
  UserProfile,
  AuthResponse,
} from '@/types/auth'

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
  const setUser = useAuthStore((state) => state.setUser)
  const logout = useAuthStore((state) => state.logout)

  return useQuery<UserProfile>({
    queryKey: ['profile', token],
    queryFn: async () => {
      try {
        const profile = await getProfileApi()
        setUser(profile)
        return profile
      } catch (error) {
        logout()
        throw error
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
