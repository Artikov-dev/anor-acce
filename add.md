# Auth System Integratsiyasi yo'riqnomasi (`add.md`)

> **Eslatma:** Foydalanuvchini **Ro'yxatdan o'tkazish (Register)** funksionalligi kodingizga (`src/api/auth.ts`, `src/hooks/useRegisterQuery.ts`, `src/pages/Register/index.tsx`, `src/routes/router.tsx`) allaqachon integratsiya qilindi.
>
> Quyida loyihaga keyinchalik qo'shilishi kerak bo'lgan **Login (Tizimga kirish)**, **Logout** va **Protected Routes (Himoyalangan sahifalar)** yo'riqnomasi qoldirildi.

---

### 1-qadam: Login API AuthService (`src/api/auth.ts`)

Quyidagi funksiya va interfeyslarni `src/api/auth.ts` hamda `src/types/auth.ts` fayllariga Login uchun qo'shish:

```typescript
// src/types/auth.ts ga qo'shish:
export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
}

// src/api/auth.ts ga qo'shish:
import { $api } from './api'
import { AuthResponse, LoginCredentials } from '@/types/auth'

export const loginApi = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await $api.post<AuthResponse>('/auth/login', credentials)
  return response.data
}

export const getProfileApi = async (): Promise<any> => {
  const response = await $api.get('/auth/profile')
  return response.data
}
```

---

### 2-qadam: Axios Interceptor va LocalStorage (`src/api/api.ts`)

`src/api/api.ts` faylini quyidagicha yangilash:

```typescript
import axios from 'axios'

export const $api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  timeout: 15_000,
})

// Request Interceptor: Token bo'lsa Authorization header qo'shish
$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response Interceptor: 401 bo'lsa tokenni o'chirib /login ga otish
$api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      if (globalThis.location.pathname !== '/login') {
        globalThis.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
```

---

### 3-qadam: TanStack Query Login Hook (`src/hooks/useAuthQueries.ts`)

`src/hooks/useAuthQueries.ts` faylini yaratish:

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProfileApi, loginApi } from '@/api/auth'
import { LoginCredentials } from '@/types/auth'

export const useLoginMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginApi(credentials),
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token)
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
}

export const useProfileQuery = () => {
  const token = localStorage.getItem('access_token')

  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfileApi,
    enabled: Boolean(token),
  })
}
```

---

### 4-qadam: AuthContext & Provider (`src/context/AuthContext.tsx`)

Login va Logout holatlarini boshqarish uchun context:

```typescript
import React, { createContext, useContext } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useProfileQuery } from '@/hooks/useAuthQueries'

interface AuthContextType {
  user: any
  isAuthenticated: boolean
  isLoading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient()
  const { data: user, isLoading, isError } = useProfileQuery()

  const isAuthenticated = Boolean(localStorage.getItem('access_token')) && !isError

  const logout = () => {
    localStorage.removeItem('access_token')
    queryClient.clear()
    globalThis.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

---

### 5-qadam: Login Sahifasi (`src/pages/Login/index.tsx`)

```tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Alert,
  Stack,
} from '@mantine/core'
import { useLoginMutation } from '@/hooks/useAuthQueries'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const loginMutation = useLoginMutation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate('/catalog', { replace: true })
        },
      }
    )
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" fw={900}>
        Tizimga kirish
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            {loginMutation.isError && (
              <Alert title="Xatolik" color="red" variant="filled">
                Login yoki parol noto'g'ri bo'lishi mumkin!
              </Alert>
            )}

            <TextInput
              label="Email"
              placeholder="john@mail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />

            <PasswordInput
              label="Parol"
              placeholder="Sizning parolingiz"
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />

            <Button
              type="submit"
              fullWidth
              mt="xl"
              loading={loginMutation.isPending}
            >
              Kirish
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
```

---

### 6-qadam: Protected Route Wrapper (`src/components/ProtectedRoute.tsx`)

```tsx
import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { Loader, Center } from '@mantine/core'
import { useAuth } from '@/context/AuthContext'

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="lg" variant="dots" />
      </Center>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
```
