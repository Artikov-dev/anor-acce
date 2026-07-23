import { create } from 'zustand'
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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('access_token'),
  isAuthenticated: !!localStorage.getItem('access_token'),
  isLoading: false,

  setAuth: (token: string, user: UserProfile) => {
    localStorage.setItem('access_token', token)
    set({ token, user, isAuthenticated: true, isLoading: false })
  },

  setUser: (user: UserProfile | null) => {
    set({ user, isAuthenticated: !!user })
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
    set({ token: null, user: null, isAuthenticated: false, isLoading: false })
  },

  setIsLoading: (isLoading: boolean) => {
    set({ isLoading })
  },
}))
