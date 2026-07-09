import { RouterProvider } from 'react-router'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { router } from '@/routes/router'

export const App = () => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>
  )
}
