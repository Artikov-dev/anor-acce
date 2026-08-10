import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router'
import {
  AppShell,
  Group,
  Text,
  Avatar,
  Button,
  NavLink,
  Stack,
  Title,
  Box,
  Skeleton,
} from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { useProfileQuery, useLogout, useAuthStore } from '@/entities/user'
import { cleanImageUrl } from '@/shared/lib/utils/cleanImageUrl'

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const logout = useLogout()
  const token = useAuthStore((state) => state.token)
  const storedUser = useAuthStore((state) => state.user)
  const { data: profile, isLoading } = useProfileQuery()

  const currentUser = profile || storedUser

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const navItems = [
    {
      label: 'Bosh sahifa',
      path: '/dashboard',
      exact: true,
    },
    {
      label: 'Mahsulotlar',
      path: '/dashboard/products',
    },
    {
      label: 'Kategoriyalar',
      path: '/dashboard/categories',
    },
  ]

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Header p="xs">
        <Group justify="space-between" h="100%" px="md">
          <Group gap="md">
            <Title
              order={3}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/dashboard')}
              c="red.7"
            >
              Anor Admin Panel
            </Title>
            <Button
              variant="subtle"
              color="gray"
              size="xs"
              onClick={() => navigate('/')}
              leftSection={<IconArrowLeft size={16} />}
            >
              Saytga o'tish
            </Button>
          </Group>

          <Group gap="md">
            {token ? (
              <>
                {isLoading ? (
                  <Group gap="xs">
                    <Skeleton height={36} circle />
                    <Skeleton height={20} width={100} />
                  </Group>
                ) : (
                  <Group gap="xs">
                    <Avatar
                      src={cleanImageUrl(currentUser?.avatar)}
                      alt={currentUser?.name || 'User'}
                      radius="xl"
                      size="sm"
                    />
                    <Text size="sm" fw={500}>
                      {currentUser?.name ||
                        currentUser?.email ||
                        'Administrator'}
                    </Text>
                  </Group>
                )}

                <Button
                  variant="light"
                  color="red"
                  size="xs"
                  onClick={handleLogout}
                >
                  Chiqish
                </Button>
              </>
            ) : (
              <Group gap="xs">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => navigate('/login')}
                >
                  Kirish
                </Button>
                <Button
                  size="xs"
                  color="red"
                  onClick={() => navigate('/register')}
                >
                  Ro'yxatdan o'tish
                </Button>
              </Group>
            )}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack gap="xs">
          <Text size="xs" fw={700} c="dimmed" tt="uppercase" px="xs" mb={4}>
            Navigatsiya
          </Text>
          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path)

            return (
              <NavLink
                key={item.path}
                label={item.label}
                active={isActive}
                onClick={() => navigate(item.path)}
                style={{ borderRadius: 8 }}
                color="red"
              />
            )
          })}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box p="sm">
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  )
}
