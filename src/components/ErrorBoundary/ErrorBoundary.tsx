import { Component, type ErrorInfo, type ReactNode } from 'react'
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Stack,
  Alert,
} from '@mantine/core'
import { IconAlertTriangle, IconRefresh } from '@tabler/icons-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Container size="sm" py={80}>
          <Paper p="xl" radius="md" withBorder shadow="sm">
            <Stack gap="md" align="center" style={{ textAlign: 'center' }}>
              <Alert
                icon={<IconAlertTriangle size={32} />}
                color="red"
                variant="light"
                w="100%"
              >
                <Title order={3}>Xatolik yuz berdi</Title>
              </Alert>

              <Text c="dimmed" size="sm">
                Kutilmagan xatolik yuzaga keldi. Iltimos, sahifani qayta yuklang
                yoki keyinroq urinib ko'ring.
              </Text>

              {this.state.error?.message && (
                <Paper p="xs" bg="gray.0" radius="sm" w="100%">
                  <Text
                    size="xs"
                    c="red"
                    style={{ fontFamily: 'monospace', wordBreak: 'break-word' }}
                  >
                    {this.state.error.message}
                  </Text>
                </Paper>
              )}

              <Button
                leftSection={<IconRefresh size={18} />}
                onClick={this.handleReload}
                color="anor"
              >
                Sahifani qayta yuklash
              </Button>
            </Stack>
          </Paper>
        </Container>
      )
    }

    return this.props.children
  }
}
