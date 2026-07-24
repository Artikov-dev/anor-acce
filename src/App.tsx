import { RouterProvider } from 'react-router'
import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { router } from '@/routes/router'
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary'

const queryClient = new QueryClient()

const theme = createTheme({
  primaryColor: 'anor',
  colors: {
    anor: [
      '#ffe5e5',
      '#ffcacc',
      '#ff999b',
      '#ff666a',
      '#ff333a',
      '#ff0009',
      '#d90008',
      '#b30006',
      '#8c0005',
      '#660004',
    ],
  },
  primaryShade: 6,
})

export const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <MantineProvider defaultColorScheme="light" theme={theme}>
          <ModalsProvider>
            <Notifications />
            <RouterProvider router={router} />
          </ModalsProvider>
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
