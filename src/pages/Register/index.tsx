import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Alert,
  Stack,
  Text,
  Anchor,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useRegisterMutation } from '@/hooks/useRegisterQuery'
import { useLoginMutation } from '@/hooks/useAuthQueries'

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const registerMutation = useRegisterMutation()
  const loginMutation = useLoginMutation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    registerMutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          setSuccessMessage(true)
          loginMutation.mutate(
            { email, password },
            {
              onSuccess: () => {
                notifications.show({
                  title: 'Xush kelibsiz!',
                  message:
                    "Muvaffaqiyatli ro'yxatdan o'tdingiz va tizimga kirdingiz!",
                  color: 'green',
                })
                navigate('/dashboard', { replace: true })
              },
              onError: () => {
                navigate('/login', { replace: true })
              },
            }
          )
        },
      }
    )
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" fw={900}>
        Ro'yxatdan o'tish
      </Title>

      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Allaqachon hisobingiz bormi?{' '}
        <Anchor size="sm" component={Link} to="/login">
          Tizimga kirish
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            {successMessage && (
              <Alert title="Muvaffaqiyatli!" color="green" variant="filled">
                Muvaffaqiyatli register bo'ldi! Daşbordga yo'naltirilmoqdasiz...
              </Alert>
            )}

            {registerMutation.isError && (
              <Alert title="Xatolik" color="red" variant="filled">
                Ro'yxatdan o'tishda xatolik yuz berdi. Qaytadan urinib ko'ring.
              </Alert>
            )}

            <TextInput
              label="Ism-sharif"
              placeholder="Ismingizni kiriting"
              required
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />

            <TextInput
              label="Email"
              placeholder="email@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />

            <PasswordInput
              label="Parol"
              placeholder="Yangi parol kiriting"
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />

            <Button
              type="submit"
              fullWidth
              mt="xl"
              loading={registerMutation.isPending}
            >
              Ro'yxatdan o'tish
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
