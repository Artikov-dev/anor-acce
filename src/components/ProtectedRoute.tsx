import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '@/store/useAuthStore'

interface ProtectedRouteProps {
  children?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children ? <>{children}</> : <Outlet />
}
