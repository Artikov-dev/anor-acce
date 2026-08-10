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
import { useLoginMutation } from '@/entities/user'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const loginMutation = useLoginMutation()

  const form = useForm({
    initialValues: {
      email: 'john@mail.com',
      password: 'changeme',
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Noto'g'ri email formati",
      password: (value) =>
        value.length >= 4
          ? null
          : "Parol kamida 4 ta belgidan iborat bo'lishi kerak",
    },
  })

  const handleSubmit = form.onSubmit((values) => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        notifications.show({
          title: 'Muvaffaqiyatli!',
          message: 'Tizimga muvaffaqiyatli kirdingiz',
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
          message: err?.response?.data?.message || "Email yoki parol noto'g'ri",
          color: 'red',
        })
      },
    })
  })

  return (
    <Container size={420} my={60}>
      <Title ta="center" fw={900}>
        Tizimga kirish
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
          <b>Foydalanuvchi:</b> <code>john@mail.com</code> | Parol:{' '}
          <code>changeme</code>
        </Text>
      </Stack>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            {loginMutation.isError && (
              <Alert title="Xatolik" color="red" variant="filled">
                Email yoki parol noto'g'ri. Qaytadan urinib ko'ring.
              </Alert>
            )}

            <TextInput
              label="Email pochta"
              placeholder="john@mail.com"
              required
              {...form.getInputProps('email')}
            />

            <PasswordInput
              label="Parol"
              placeholder="••••••••"
              required
              {...form.getInputProps('password')}
            />

            <Button
              type="submit"
              fullWidth
              color="red"
              mt="xl"
              loading={loginMutation.isPending}
            >
              Kirish
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
