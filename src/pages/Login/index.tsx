import React from 'react'
import { useNavigate } from 'react-router'
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Stack,
  Text,
  Alert,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import type { AxiosError } from 'axios'
import { useLoginMutation } from '@/hooks/useAuthQueries'
import { useAuthStore } from '@/store/useAuthStore'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const loginMutation = useLoginMutation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const form = useForm({
    initialValues: {
      email: 'john@mail.com',
      password: 'changeme',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Некорректный email'),
      password: (value) =>
        value.length >= 4 ? null : 'Пароль должен содержать минимум 4 символа',
    },
  })

  const handleSubmit = form.onSubmit((values) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        notifications.show({
          title: 'Успешно!',
          message: 'Вы успешно вошли в систему',
          color: 'green',
        })
        navigate('/dashboard', { replace: true })
      },
      onError: (err: AxiosError<{ message?: string }>) => {
        notifications.show({
          title: 'Ошибка авторизации',
          message: err?.response?.data?.message || 'Неверный email или пароль',
          color: 'red',
        })
      },
    })
  })

  return (
    <Container size={420} my={60}>
      <Title ta="center" fw={900}>
        Вход в админ-панель
      </Title>

      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Тестовые данные: <b>john@mail.com</b> / <b>changeme</b>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            {loginMutation.isError && (
              <Alert title="Ошибка" color="red" variant="filled">
                Неверный email или пароль. Попробуйте еще раз.
              </Alert>
            )}

            <TextInput
              label="Email"
              placeholder="john@mail.com"
              required
              {...form.getInputProps('email')}
            />

            <PasswordInput
              label="Пароль"
              placeholder="••••••••"
              required
              {...form.getInputProps('password')}
            />

            <Button
              type="submit"
              fullWidth
              mt="xl"
              loading={loginMutation.isPending}
            >
              Войти
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
