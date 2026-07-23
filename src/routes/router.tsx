import { createBrowserRouter, Navigate } from 'react-router'
import { Layout } from '@/components/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { DashboardLayout } from '@/components/DashboardLayout'
import { ProductsPage } from '@/pages/ProductsPage'
import { Product } from '@/pages/Product'
import { Cart } from '@/pages/Cart'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { About } from '@/pages/About'
import { Contact } from '@/pages/Contact'
import { DashboardHome } from '@/pages/DashboardHome'
import { DashboardProducts } from '@/pages/DashboardProducts'
import { DashboardCategories } from '@/pages/DashboardCategories'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: 'products',
        element: <DashboardProducts />,
      },
      {
        path: 'categories',
        element: <DashboardCategories />,
      },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'catalog',
        element: <ProductsPage />,
      },
      {
        path: 'product/:id',
        element: <Product />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: '*',
        element: <div>404 - Страница не найдена</div>,
      },
    ],
  },
])
