import { createBrowserRouter } from 'react-router'
import { ProtectedRoute } from '@/features/auth'
import { Layout } from '@/widgets/layout'
import { DashboardLayout } from '@/widgets/dashboard-layout'
import { ProductsPage } from '@/pages/catalog'
import { Product } from '@/pages/product-detail'
import { Cart } from '@/pages/cart'
import { Login } from '@/pages/login'
import { Register } from '@/pages/register'
import { About } from '@/pages/about'
import { Contact } from '@/pages/contact'
import { DashboardHome } from '@/pages/dashboard-home'
import { DashboardProducts } from '@/pages/dashboard-products'
import { DashboardCategories } from '@/pages/dashboard-categories'
import { Home } from '@/pages/home'

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
        element: <Home />,
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
        element: <div>404 - Sahifa topilmadi</div>,
      },
    ],
  },
])
