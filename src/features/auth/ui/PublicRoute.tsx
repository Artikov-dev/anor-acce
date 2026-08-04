import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '@/entities/user'

interface PublicRouteProps {
  children?: React.ReactNode
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)

  if (token) {
    if (user?.role === 'admin') {
      return <Navigate to="/dashboard" replace />
    }
    return <Navigate to="/catalog" replace />
  }

  return children ? <>{children}</> : <Outlet />
}
