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
