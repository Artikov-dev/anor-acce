import {
  Container,
  Title,
  Text,
  Grid,
  SimpleGrid,
  Box,
  Group,
  ThemeIcon,
  Stack,
  Card,
  Avatar,
  Accordion,
  Button,
} from '@mantine/core'
import {
  IconPlayerPlayFilled,
  IconCheck,
  IconQuote,
  IconBrandApple,
  IconBrandGooglePlay,
} from '@tabler/icons-react'

export const About = () => {
  const redBg = '#990033'

  return (
    <Box pb={80}>
      <Container size="xl" py={40}>
        <Stack align="center" mb={60}>
          <Title order={1} size={48} fw={900}>
            About Us
          </Title>
          <Text c="dimmed">
            Home /{' '}
            <Text span fw={600} c="black">
              About Us
            </Text>
          </Text>
        </Stack>

        <Grid gap={60} mb={80} align="center">
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Title order={2} size={40} fw={900} lh={1.1}>
              Where every drive feels extraordinary
            </Title>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <SimpleGrid cols={2} spacing="xl">
              <Box>
                <Title order={4} mb="xs">
                  Variety Brands
                </Title>
                <Text size="sm" c="dimmed">
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas.
                </Text>
              </Box>
              <Box>
                <Title order={4} mb="xs">
                  Awesome Support
                </Title>
                <Text size="sm" c="dimmed">
                  Nulla facilisi. Aenean nec eros. Vestibulum ante ipsum primis
                  in faucibus orci luctus et.
                </Text>
              </Box>
              <Box>
                <Title order={4} mb="xs">
                  Maximum Freedom
                </Title>
                <Text size="sm" c="dimmed">
                  Mauris in quam tristique, dignissim urna in, congue magna.
                  Donec sit amet urna sit amet erat.
                </Text>
              </Box>
              <Box>
                <Title order={4} mb="xs">
                  Flexibility On The Go
                </Title>
                <Text size="sm" c="dimmed">
                  Pellentesque vel purus varius, rhoncus ex sed, tincidunt
                  sapien. Curabitur elementum mi.
                </Text>
              </Box>
            </SimpleGrid>
          </Grid.Col>
        </Grid>

        <Box
          bg="#f1f3f5"
          mb={80}
          style={{
            height: 400,
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ThemeIcon
            radius="xl"
            size={80}
            bg={redBg}
            style={{ cursor: 'pointer' }}
          >
            <IconPlayerPlayFilled size={32} />
          </ThemeIcon>
        </Box>

        <SimpleGrid cols={{ base: 1, sm: 3 }} mb={100} ta="center">
          <Box>
            <Title size={64} c={redBg} fw={900}>
              20k+
            </Title>
            <Text fw={700} size="lg">
              Happy customers
            </Text>
          </Box>
          <Box>
            <Title size={64} c={redBg} fw={900}>
              540+
            </Title>
            <Text fw={700} size="lg">
              Count of cars
            </Text>
          </Box>
          <Box>
            <Title size={64} c={redBg} fw={900}>
              25+
            </Title>
            <Text fw={700} size="lg">
              Years of expertise
            </Text>
          </Box>
        </SimpleGrid>

        <Grid gap={60} mb={100} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2} size={36} fw={900} lh={1.1} mb="md">
              Unlock unforgettable memories on the road
            </Title>
            <Text c="dimmed" mb="xl">
              Aliquam varius diam mauris, ut congue nunc consequat sed. Maecenas
              ac mi justo. Praesent feugiat eros quis imperdiet ultricies.
            </Text>

            <SimpleGrid cols={2} spacing="md">
              {[
                'Nulla euismod diam et dui imperdiet varius. Aenean gravida.',
                'Fusce euismod dui quis elit dapibus tempor. Class aptent taciti.',
                'Suspendisse potenti. In in congue purus. Sed euismod est id.',
                'Maecenas rhoncus, nulla at bibendum elementum, nunc orci.',
              ].map((text, i) => (
                <Group key={i} align="flex-start" wrap="nowrap" gap="sm">
                  <ThemeIcon radius="xl" size={24} bg={redBg} mt={2}>
                    <IconCheck size={14} stroke={3} />
                  </ThemeIcon>
                  <Text size="sm" c="dimmed">
                    {text}
                  </Text>
                </Group>
              ))}
            </SimpleGrid>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              bg="#f1f3f5"
              style={{
                height: 400,
                borderRadius: 24,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
            />
          </Grid.Col>
        </Grid>

        <Box
          bg={redBg}
          p={60}
          mb={100}
          style={{ borderRadius: 40, position: 'relative', overflow: 'hidden' }}
        >
          <Grid align="center" gap={60}>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Box
                bg="white"
                style={{
                  width: 220,
                  height: 450,
                  borderRadius: 36,
                  border: '8px solid black',
                  margin: '0 auto',
                  position: 'absolute',
                  top: 20,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Title c="white" size={40} mb="sm">
                Download our app
              </Title>
              <Text c="white" opacity={0.9} mb="xl" maw={500}>
                Nulla varius neque eget ipsum eleifend, ut ultrices nunc
                vehicula. Curabitur vel lorem diam. Duis accumsan elit est.
              </Text>
              <Group>
                <Button
                  size="xl"
                  bg="black"
                  leftSection={<IconBrandApple size={24} />}
                  radius="md"
                >
                  <Stack gap={0} align="flex-start">
                    <Text size="xs" lh={1} fw={400}>
                      Download on the
                    </Text>
                    <Text size="sm" fw={700}>
                      App Store
                    </Text>
                  </Stack>
                </Button>
                <Button
                  size="xl"
                  bg="black"
                  leftSection={<IconBrandGooglePlay size={24} />}
                  radius="md"
                >
                  <Stack gap={0} align="flex-start">
                    <Text size="xs" lh={1} fw={400}>
                      GET IT ON
                    </Text>
                    <Text size="sm" fw={700}>
                      Google Play
                    </Text>
                  </Stack>
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Box>

        <Title ta="center" order={2} size={36} mb={40}>
          Reviews from our customers
        </Title>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mb={100}>
          {[
            {
              name: 'Sarah Doyle',
              role: 'Customer',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
            },
            {
              name: 'Oliver Wilson',
              role: 'Customer',
              text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
            },
            {
              name: 'Kylie Williams',
              role: 'Customer',
              text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis.',
            },
          ].map((review, i) => (
            <Card
              key={i}
              p={0}
              radius="xl"
              style={{
                border: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box p={40} bg="#fafafa" style={{ flex: 1 }}>
                <ThemeIcon
                  size={40}
                  radius="xl"
                  variant="light"
                  color="indigo"
                  mb="xl"
                >
                  <IconQuote size={20} />
                </ThemeIcon>
                <Text fw={500} ta="center" c="dimmed">
                  "{review.text}"
                </Text>
              </Box>
              <Box
                bg={redBg}
                p="md"
                ta="center"
                style={{ position: 'relative' }}
              >
                <Avatar
                  size={60}
                  radius="xl"
                  style={{
                    position: 'absolute',
                    top: -30,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    border: '4px solid white',
                  }}
                  color="gray"
                />
                <Text c="white" fw={700} mt={20}>
                  {review.name}
                </Text>
                <Text c="white" size="xs" opacity={0.8}>
                  {review.role}
                </Text>
              </Box>
            </Card>
          ))}
        </SimpleGrid>

        <Stack align="center" mb={40}>
          <Title order={2} size={36}>
            Top Car Rental Questions
          </Title>
        </Stack>
        <Box maw={800} mx="auto">
          <Accordion variant="separated" radius="md">
            {[
              'How does it work?',
              'Can I rent a car without a credit card?',
              'What are the requirements for renting a car?',
              'Does Car Rental allow me to tow with or attach a hitch to the rental vehicle?',
              'Does Car Rental offer coverage products for purchase with my rental?',
            ].map((q, i) => (
              <Accordion.Item
                key={i}
                value={`faq-${i}`}
                bg="#fafafa"
                style={{ border: '1px solid #e9ecef' }}
              >
                <Accordion.Control>
                  <Text fw={600}>{q}</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text c="dimmed" size="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Box>
      </Container>
    </Box>
  )
}
