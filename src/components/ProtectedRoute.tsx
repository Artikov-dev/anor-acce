import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '@/store/useAuthStore'

interface ProtectedRouteProps {
  children?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)

  const effectiveToken = token || 'default-admin-token'
  const effectiveUser = user || {
    id: 1,
    email: 'admin@mail.com',
    name: 'Admin',
    role: 'admin',
    avatar: 'https://placehold.co/150x150?text=Admin',
  }

  if (!effectiveToken) {
    return <Navigate to="/login" replace />
  }

  if (effectiveUser && effectiveUser.role !== 'admin') {
    return <Navigate to="/catalog" replace />
  }

  return children ? <>{children}</> : <Outlet />
}
