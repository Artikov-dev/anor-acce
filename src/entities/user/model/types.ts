export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  avatar?: string
}

export interface UserProfile {
  id: number
  email: string
  name: string
  role: string
  avatar: string
}
