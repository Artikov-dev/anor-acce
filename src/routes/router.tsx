import { createBrowserRouter } from 'react-router'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { Catalog } from '@/pages/Catalog'
import { Product } from '@/pages/Product'
import { Cart } from '@/pages/Cart'
import { Login } from '@/pages/Login'
import { About } from '@/pages/About'
import { Contact } from '@/pages/Contact'

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
