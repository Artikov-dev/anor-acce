import { useState } from 'react'
import {
  AppShell,
  Group,
  Text,
  Container,
  Stack,
  Grid,
  Title,
  Box,
  Button,
  Divider,
  Avatar,
  Burger,
  Drawer,
  Indicator,
  ActionIcon,
} from '@mantine/core'
import { IconShoppingCart, IconDashboard } from '@tabler/icons-react'
import { Outlet, Link, useLocation } from 'react-router'
import { useAuthStore, useProfileQuery, useLogout } from '@/entities/user'
import { useCartStore } from '@/entities/cart'

export const Layout = () => {
  const location = useLocation()
  const [opened, setOpened] = useState(false)
  useProfileQuery()

  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useLogout()
  const cartCount = useCartStore((state) => state.getTotalCount())
  const isAdmin = user?.role === 'admin'

  const navLinks = [
    { label: 'Bosh sahifa', path: '/' },
    { label: 'Katalog', path: '/catalog' },
    { label: 'Biz haqimizda', path: '/about' },
    { label: 'Aloqa', path: '/contact' },
  ]

  return (
    <AppShell header={{ height: 80 }} padding="md">
      <AppShell.Header>
        <Container size="xl" h="100%">
          <Group h="100%" px="md" justify="space-between">
            <Group gap="md">
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                hiddenFrom="md"
                size="sm"
              />
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Group gap="xs">
                  <Text fw={900} size="xl" c="red.7">
                    Anor Rental
                  </Text>
                </Group>
              </Link>
            </Group>

            <Group gap="xl" visibleFrom="md">
              {navLinks.map((link) => (
                <Text
                  key={link.path}
                  component={Link}
                  to={link.path}
                  fw={location.pathname === link.path ? 700 : 500}
                  c={location.pathname === link.path ? 'red.7' : 'inherit'}
                  style={{ textDecoration: 'none' }}
                >
                  {link.label}
                </Text>
              ))}
            </Group>

            <Group gap="md">
              <Indicator
                label={cartCount}
                size={18}
                offset={4}
                color="red"
                disabled={cartCount === 0}
              >
                <ActionIcon
                  component={Link}
                  to="/cart"
                  variant={location.pathname === '/cart' ? 'filled' : 'light'}
                  color="red"
                  size="lg"
                  radius="md"
                  aria-label="Savat"
                >
                  <IconShoppingCart size={20} />
                </ActionIcon>
              </Indicator>

              {isAdmin && (
                <Button
                  component={Link}
                  to="/dashboard"
                  variant="outline"
                  color="red"
                  size="xs"
                  radius="md"
                  leftSection={<IconDashboard size={16} />}
                  visibleFrom="sm"
                >
                  Admin Panel
                </Button>
              )}

              {isAuthenticated && user ? (
                <Group gap="sm">
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    radius="xl"
                    color="red"
                  >
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </Avatar>
                  <Stack gap={0} visibleFrom="sm">
                    <Text size="sm" fw={600} lh={1.2}>
                      {user.name}
                    </Text>
                    <Text size="xs" c="dimmed" lh={1.2}>
                      {user.email}
                    </Text>
                  </Stack>
                  <Button
                    variant="light"
                    color="red"
                    radius="md"
                    size="xs"
                    onClick={logout}
                  >
                    Chiqish
                  </Button>
                </Group>
              ) : (
                <Group gap="xs" visibleFrom="xs">
                  <Button
                    component={Link}
                    to="/login"
                    variant="default"
                    radius="md"
                    size="xs"
                  >
                    Kirish
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    color="red"
                    radius="md"
                    size="xs"
                  >
                    Ro'yxatdan o'tish
                  </Button>
                </Group>
              )}
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Text fw={900} size="lg" c="red.7">
            Anor Rental Menyusi
          </Text>
        }
        padding="md"
        size="md"
      >
        <Stack gap="md" mt="md">
          {navLinks.map((link) => (
            <Text
              key={link.path}
              component={Link}
              to={link.path}
              fw={location.pathname === link.path ? 700 : 500}
              c={location.pathname === link.path ? 'red.7' : 'inherit'}
              style={{ textDecoration: 'none', fontSize: 18 }}
              onClick={() => setOpened(false)}
            >
              {link.label}
            </Text>
          ))}

          <Text
            component={Link}
            to="/cart"
            fw={location.pathname === '/cart' ? 700 : 500}
            c={location.pathname === '/cart' ? 'red.7' : 'inherit'}
            style={{ textDecoration: 'none', fontSize: 18 }}
            onClick={() => setOpened(false)}
          >
            Savat ({cartCount})
          </Text>

          {isAdmin && (
            <Button
              component={Link}
              to="/dashboard"
              color="red"
              variant="light"
              fullWidth
              mt="sm"
              onClick={() => setOpened(false)}
            >
              Admin Panelga o'tish
            </Button>
          )}

          {!isAuthenticated && (
            <Group gap="md" mt="md">
              <Button
                component={Link}
                to="/login"
                variant="default"
                fullWidth
                onClick={() => setOpened(false)}
              >
                Kirish
              </Button>
              <Button
                component={Link}
                to="/register"
                color="red"
                fullWidth
                onClick={() => setOpened(false)}
              >
                Ro'yxatdan o'tish
              </Button>
            </Group>
          )}
        </Stack>
      </Drawer>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <AppShell.Footer p="xl" style={{ position: 'static' }}>
        <Container size="xl">
          <Grid gap="xl">
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Group gap="xs" mb="md">
                <Text fw={900} size="xl" c="red.7">
                  Anor Rental
                </Text>
              </Group>
              <Text size="sm" c="dimmed" mb="md" style={{ lineHeight: 1.6 }}>
                Avtomobillarni qulay va arzon narxlarda ijaraga berish xizmati.
                Biz bilan har bir safaringiz xavfsiz va qulay bo'ladi!
              </Text>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Title order={5} mb="md">
                Foydali havolalar
              </Title>
              <Stack gap="xs">
                <Text
                  component={Link}
                  to="/"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  Bosh sahifa
                </Text>
                <Text
                  component={Link}
                  to="/catalog"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  Avtomobillar katalogi
                </Text>
                <Text
                  component={Link}
                  to="/about"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  Biz haqimizda
                </Text>
                <Text
                  component={Link}
                  to="/contact"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  Aloqa
                </Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Title order={5} mb="md">
                Kategoriyalar
              </Title>
              <Stack gap="xs">
                <Text
                  component={Link}
                  to="/catalog"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  Sedan & Krossover
                </Text>
                <Text
                  component={Link}
                  to="/catalog"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  SUV & Yo'ltanlamas
                </Text>
                <Text
                  component={Link}
                  to="/catalog"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  Biznes va Lyuks
                </Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <Title order={5} mb="md">
                Bog'lanish
              </Title>
              <Stack gap="sm">
                <Box>
                  <Text size="xs" c="dimmed">
                    Manzil:
                  </Text>
                  <Text size="sm" fw={500}>
                    Toshkent shahri, Yunusobod tumani
                  </Text>
                </Box>
                <Box>
                  <Text size="xs" c="dimmed">
                    Elektron pochta:
                  </Text>
                  <Text size="sm" fw={500}>
                    info@anor-rental.uz
                  </Text>
                </Box>
                <Box>
                  <Text size="xs" c="dimmed">
                    Telefon:
                  </Text>
                  <Text size="sm" fw={700} c="red.7">
                    +998 71 200-00-00
                  </Text>
                </Box>
              </Stack>
            </Grid.Col>
          </Grid>

          <Divider my="xl" />
          <Text ta="center" size="sm" c="dimmed">
            © {new Date().getFullYear()} Anor Rental. Barcha huquqlar
            himoyalangan.
          </Text>
        </Container>
      </AppShell.Footer>
    </AppShell>
  )
}
