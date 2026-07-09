import { createBrowserRouter } from 'react-router'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { Catalog } from '@/pages/Catalog'
import { Product } from '@/pages/Product'
import { Cart } from '@/pages/Cart'
import { Login } from '@/pages/Login'

export const router = createBrowserRouter([
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
        element: <Catalog />,
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
        path: 'login',
        element: <Login />,
      },
      {
        path: '*',
        element: <div>404 - Страница не найдена</div>,
      },
    ],
  },
])
