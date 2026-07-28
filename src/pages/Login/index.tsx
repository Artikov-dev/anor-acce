import React from 'react'
import { useNavigate, Link } from 'react-router'
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
  Anchor,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useLoginMutation } from '@/hooks/useAuthQueries'
export const Login: React.FC = () => {
  const navigate = useNavigate()
  const loginMutation = useLoginMutation()

  const form = useForm({
    initialValues: {
      email: 'admin@mail.com',
      password: 'admin123',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Некорректный email'),
      password: (value) =>
        value.length >= 4 ? null : 'Пароль должен содержать минимум 4 символа',
    },
  })

  const handleSubmit = form.onSubmit((values) => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        notifications.show({
          title: 'Muvaffaqiyatli!',
          message: 'Tizimga kirdingiz',
          color: 'green',
        })
        if (data.profile?.role === 'admin') {
          navigate('/dashboard', { replace: true })
        } else {
          navigate('/catalog', { replace: true })
        }
      },
      onError: (err) => {
        notifications.show({
          title: 'Xatolik',
          message: err?.response?.data?.message || 'Email yoki parol xato',
          color: 'red',
        })
      },
    })
  })

  return (
    <Container size={420} my={60}>
      <Title ta="center" fw={900}>
        Tizimga kirish (Login)
      </Title>

      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Hisobingiz yo'qmi?{' '}
        <Anchor size="sm" component={Link} to="/register">
          Ro'yxatdan o'tish
        </Anchor>
      </Text>

      <Stack gap={2} mt={8} align="center">
        <Text size="xs" c="dimmed">
          <b>Admin login:</b> <code>admin@mail.com</code> | Parol:{' '}
          <code>admin123</code>
        </Text>
        <Text size="xs" c="dimmed">
          <b>User login:</b> <code>john@mail.com</code> | Parol:{' '}
          <code>changeme</code>
        </Text>
      </Stack>

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
