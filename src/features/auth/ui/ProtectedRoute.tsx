import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '@/entities/user'

interface ProtectedRouteProps {
  children?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/catalog" replace />
  }

  return children ? <>{children}</> : <Outlet />
}
