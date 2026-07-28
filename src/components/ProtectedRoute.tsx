import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '@/store/useAuthStore'

interface ProtectedRouteProps {
  children?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  // Admin bo'lmagan foydalanuvchilarni Admin panelga o'tkazmaslik
  if (user && user.role !== 'admin') {
    return <Navigate to="/catalog" replace />
  }

  return children ? <>{children}</> : <Outlet />
}
