import { useState } from 'react'
import {
  Container,
  Title,
  Text,
  Grid,
  SimpleGrid,
  Box,
  Group,
  Stack,
  Card,
  TextInput,
  Textarea,
  Button,
  Image,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import {
  IconMapPin,
  IconMail,
  IconPhone,
  IconClock,
  IconCheck,
} from '@tabler/icons-react'

export const Contact = () => {
  const redBg = '#d90008'
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setName('')
      setPhone('')
      setMessage('')
      notifications.show({
        title: 'Muvaffaqiyatli!',
        message: "Xabaringiz yuborildi. Tez orada siz bilan bog'lanamiz.",
        color: 'green',
        icon: <IconCheck size={18} />,
      })
    }, 800)
  }

  return (
    <Box pb={80}>
      <Container size="xl" py={40}>
        <Stack align="center" mb={60}>
          <Title order={1} size={48} fw={900}>
            Biz Bilan Aloqa
          </Title>
          <Text c="dimmed">
            Bosh sahifa /{' '}
            <Text span fw={600} c="black">
              Aloqa
            </Text>
          </Text>
        </Stack>

        <Grid gap={40} mb={80}>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Card
              p={40}
              radius="xl"
              bg={redBg}
              c="white"
              style={{ height: '100%' }}
            >
              <Title order={3} c="white" ta="center" mb="xl">
                Bizga Xabar Yo'llang
              </Title>
              <form onSubmit={handleSubmit}>
                <Stack gap="md">
                  <TextInput
                    placeholder="Ismingiz"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    styles={{
                      input: {
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        color: 'white',
                        borderColor: 'rgba(255,255,255,0.3)',
                      },
                    }}
                  />
                  <TextInput
                    placeholder="Telefon raqamingiz"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    styles={{
                      input: {
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        color: 'white',
                        borderColor: 'rgba(255,255,255,0.3)',
                      },
                    }}
                  />
                  <Textarea
                    placeholder="Xabaringiz matni..."
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    styles={{
                      input: {
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        color: 'white',
                        borderColor: 'rgba(255,255,255,0.3)',
                      },
                    }}
                  />
                  <Button
                    fullWidth
                    size="md"
                    color="dark"
                    mt="md"
                    radius="md"
                    type="submit"
                    loading={loading}
                  >
                    Xabarni yuborish
                  </Button>
                </Stack>
              </form>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Box
              style={{
                height: '100%',
                minHeight: 400,
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1000&q=80"
                h="100%"
                alt="Anor Rental Office"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </Grid.Col>
        </Grid>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl" mb={80}>
          <Group wrap="nowrap" align="flex-start">
            <IconMapPin size={32} color={redBg} />
            <Box>
              <Text size="sm" c="dimmed">
                Manzilimiz
              </Text>
              <Text fw={700}>
                Toshkent sh., Yunusobod tumani, Amir Temur ko'chasi 42-uy
              </Text>
            </Box>
          </Group>
          <Group wrap="nowrap" align="flex-start">
            <IconMail size={32} color={redBg} />
            <Box>
              <Text size="sm" c="dimmed">
                Elektron pochta
              </Text>
              <Text fw={700}>info@anor-rental.uz</Text>
            </Box>
          </Group>
          <Group wrap="nowrap" align="flex-start">
            <IconPhone size={32} color={redBg} />
            <Box>
              <Text size="sm" c="dimmed">
                Telefon
              </Text>
              <Text fw={700}>+998 71 200-00-00</Text>
            </Box>
          </Group>
          <Group wrap="nowrap" align="flex-start">
            <IconClock size={32} color={redBg} />
            <Box>
              <Text size="sm" c="dimmed">
                Ish vaqti
              </Text>
              <Text fw={700}>Dush-Yak: 24 soat ochiq</Text>
            </Box>
          </Group>
        </SimpleGrid>

        <Box
          py={40}
          px={{ base: 20, md: 60 }}
          bg="#fafafa"
          style={{ borderRadius: 24 }}
        >
          <Group
            justify="space-around"
            wrap="wrap"
            style={{ opacity: 0.8 }}
            gap="xl"
          >
            <Title order={3} fw={900}>
              TOYOTA
            </Title>
            <Title order={3} fw={900} style={{ fontFamily: 'serif' }}>
              Ford
            </Title>
            <Title order={3} fw={300} style={{ letterSpacing: 2 }}>
              MERCEDES
            </Title>
            <Title order={3} fw={900}>
              JEEP
            </Title>
            <Title order={3} fw={900} style={{ letterSpacing: 1 }}>
              BMW
            </Title>
            <Title order={3} fw={300} style={{ fontStyle: 'italic' }}>
              AUDI
            </Title>
          </Group>
        </Box>
      </Container>
    </Box>
  )
}
