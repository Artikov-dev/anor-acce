import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile } from '@/types/auth'

interface AuthState {
  user: UserProfile | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setAuth: (token: string, user: UserProfile) => void
  setUser: (user: UserProfile | null) => void
  setToken: (token: string | null) => void
  logout: () => void
  setIsLoading: (loading: boolean) => void
}

const DEFAULT_USER: UserProfile = {
  id: 1,
  email: 'admin@mail.com',
  name: 'Admin',
  role: 'admin',
  avatar: 'https://placehold.co/150x150?text=Admin',
}

const DEFAULT_TOKEN = 'default-admin-token'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: DEFAULT_USER,
      token: DEFAULT_TOKEN,
      isAuthenticated: true,
      isLoading: false,

      setAuth: (token: string, user: UserProfile) => {
        localStorage.setItem('access_token', token)
        set({ token, user, isAuthenticated: true, isLoading: false })
      },

      setUser: (user: UserProfile | null) => {
        set((state) => ({ user, isAuthenticated: !!user || !!state.token }))
      },

      setToken: (token: string | null) => {
        if (token) {
          localStorage.setItem('access_token', token)
        } else {
          localStorage.removeItem('access_token')
        }
        set({ token, isAuthenticated: !!token })
      },

      logout: () => {
        localStorage.removeItem('access_token')
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      },

      setIsLoading: (isLoading: boolean) => {
        set({ isLoading })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: !!state.token,
      }),
    }
  )
)
