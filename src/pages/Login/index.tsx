import React, { useState } from 'react'
import { Link } from 'react-router'
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
} from '@mantine/core'

export const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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

            <Button type="submit" fullWidth mt="xl">
              Kirish
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
