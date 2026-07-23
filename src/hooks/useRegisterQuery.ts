import { useMutation } from '@tanstack/react-query'
import { registerApi } from '@/api/auth'
import type { RegisterCredentials } from '@/types/auth'

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => registerApi(credentials),
  })
}
