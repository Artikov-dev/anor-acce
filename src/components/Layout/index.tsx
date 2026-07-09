import { AppShell, Group, Button, Title, Container } from '@mantine/core'
import { Outlet, Link, useLocation } from 'react-router'

export const Layout = () => {
  const location = useLocation()

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container size="xl" h="100%">
          <Group h="100%" px="md" justify="space-between">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Title order={3}>Anor</Title>
            </Link>
            <Group gap="sm">
              <Button
                component={Link}
                to="/"
                variant={location.pathname === '/' ? 'light' : 'subtle'}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/catalog"
                variant={location.pathname === '/catalog' ? 'light' : 'subtle'}
              >
                Catalog
              </Button>
              <Button
                component={Link}
                to="/cart"
                variant={location.pathname === '/cart' ? 'light' : 'subtle'}
              >
                Cart
              </Button>
              <Button
                component={Link}
                to="/login"
                variant={location.pathname === '/login' ? 'light' : 'subtle'}
                color="blue"
              >
                Login
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
