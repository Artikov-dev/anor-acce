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
import { useProfileQuery, useLogout } from '@/hooks/useAuthQueries'
import { useAuthStore } from '@/store/useAuthStore'

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const logout = useLogout()
  const storedUser = useAuthStore((state) => state.user)
  const { data: profile, isLoading } = useProfileQuery()

  const currentUser = profile || storedUser

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const navItems = [
    {
      label: 'Главная',
      path: '/dashboard',
      exact: true,
    },
    {
      label: 'Товары',
      path: '/dashboard/products',
    },
    {
      label: 'Категории',
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
          <Group gap="xs">
            <Title
              order={3}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/dashboard')}
            >
              Admin Panel
            </Title>
          </Group>

          <Group gap="md">
            {isLoading ? (
              <Group gap="xs">
                <Skeleton height={36} circle />
                <Skeleton height={20} width={100} />
              </Group>
            ) : (
              <Group gap="xs">
                <Avatar
                  src={currentUser?.avatar}
                  alt={currentUser?.name || 'User'}
                  radius="xl"
                  size="sm"
                />
                <Text size="sm" fw={500}>
                  {currentUser?.name || currentUser?.email || 'Администратор'}
                </Text>
              </Group>
            )}

            <Button
              variant="light"
              color="red"
              size="xs"
              onClick={handleLogout}
            >
              Выйти
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack gap="xs">
          <Text size="xs" fw={700} c="dimmed" tt="uppercase" px="xs" mb={4}>
            Навигация
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
