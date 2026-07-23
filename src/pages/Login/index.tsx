import React, { useState } from 'react'
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
  Anchor,
  Alert,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconAlertCircle } from '@tabler/icons-react'
import { useLoginMutation } from '@/hooks/useAuthQueries'
import { useAuthStore } from '@/store/useAuthStore'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const loginMutation = useLoginMutation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          notifications.show({
            title: 'Muvaffaqiyatli!',
            message: 'Tizimga muvaffaqiyatli kirdingiz',
            color: 'green',
          })
          navigate('/')
        },
      }
    )
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" fw={900}>
        Tizimga kirish
      </Title>

      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Hali hisobingiz yo'qmi?{' '}
        <Anchor size="sm" component={Link} to="/register">
          Ro'yxatdan o'tish
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            {loginMutation.isError && (
              <Alert
                icon={<IconAlertCircle size={16} />}
                title="Xatolik"
                color="red"
                variant="filled"
              >
                Email yoki parol noto'g'ri. Qaytadan urinib ko'ring.
              </Alert>
            )}

            <TextInput
              label="Email"
              placeholder="email@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />

            <PasswordInput
              label="Parol"
              placeholder="Sizning parolingiz"
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />

            <Button
              type="submit"
              fullWidth
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
