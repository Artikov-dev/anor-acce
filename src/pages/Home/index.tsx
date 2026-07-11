import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  Divider,
} from '@mantine/core'
import {
  IconMapPin,
  IconCar,
  IconPigMoney,
  IconCalendarEvent,
  IconUsers,
  IconAirConditioning,
  IconManualGearbox,
  IconBrandApple,
  IconBrandGooglePlay,
  IconChevronDown,
} from '@tabler/icons-react'
const redBg = '#990033'
const orangeBtn = '#F59E0B'

export const Home = () => {
  return (
    <Box pb={80}>
      <Container size="xl">
        <Box
          bg={redBg}
          c="white"
          style={{
            borderRadius: 20,
            position: 'relative',
            overflow: 'hidden',
            minHeight: 500,
            marginTop: 20,
          }}
          p={{ base: 'xl', md: 60 }}
        >
          <Grid gap={50} align="center">
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Title c="white" size={48} fw={800} lh={1.1} mb="md">
                Experience the road
                <br />
                like never before
              </Title>
              <Text c="white" size="lg" mb="xl" opacity={0.9} maw={500}>
                Discover ultimate driving comfort. Rent or buy your dream car
                today and embark on an adventure with no limits!
              </Text>
              <Button size="lg" bg={orangeBtn} radius="md">
                View all cars
              </Button>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 5 }}>
              <Card radius="md" p="xl" withBorder shadow="xl">
                <Title order={3} ta="center" mb="xl">
                  Book your car
                </Title>
                <Stack gap="md">
                  <Select
                    placeholder="Car type"
                    data={['SUV', 'Sedan', 'Coupe', 'Hatchback']}
                    rightSection={<IconChevronDown size={16} />}
                  />
                  <Select
                    placeholder="Pick-up location"
                    data={['New York', 'London', 'Berlin', 'Paris']}
                    rightSection={<IconChevronDown size={16} />}
                  />
                  <Select
                    placeholder="Drop-off location"
                    data={['New York', 'London', 'Berlin', 'Paris']}
                    rightSection={<IconChevronDown size={16} />}
                  />
                  <TextInput
                    placeholder="Pick-up date"
                    rightSection={<IconCalendarEvent size={16} />}
                  />
                  <TextInput
                    placeholder="Return date"
                    rightSection={<IconCalendarEvent size={16} />}
                  />
                  <Button fullWidth size="md" bg={orangeBtn} mt="sm">
                    Book now
                  </Button>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </Box>
      </Container>

      <Container size="xl" py={80}>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing={50}>
          <Stack align="center" ta="center">
            <ThemeIcon size={64} radius="xl" variant="light" color="gray">
              <IconMapPin size={32} stroke={1.5} color="black" />
            </ThemeIcon>
            <Title order={4}>Availability</Title>
            <Text c="dimmed" size="sm">
              Discover local and international car rentals at affordable rates.
            </Text>
          </Stack>
          <Stack align="center" ta="center">
            <ThemeIcon size={64} radius="xl" variant="light" color="gray">
              <IconCar size={32} stroke={1.5} color="black" />
            </ThemeIcon>
            <Title order={4}>Comfort</Title>
            <Text c="dimmed" size="sm">
              Provide local & international car rentals at a price you can't
              resist.
            </Text>
          </Stack>
          <Stack align="center" ta="center">
            <ThemeIcon size={64} radius="xl" variant="light" color="gray">
              <IconPigMoney size={32} stroke={1.5} color="black" />
            </ThemeIcon>
            <Title order={4}>Savings</Title>
            <Text c="dimmed" size="sm">
              Provide local & international car rentals at a price you can't
              resist.
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>

      <Container size="xl" py={60}>
        <Grid gap={60} align="center">
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Box
              w="100%"
              style={{ aspectRatio: '1', borderRadius: 20, overflow: 'hidden' }}
              bg="linear-gradient(135deg, #A8C0FF 0%, #3F2B96 100%)"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="xl">
              {[
                {
                  title: 'Create an account',
                  desc: 'Provide local & international car rentals at affordable rates that you will no longer have to pay high commissions.',
                },
                {
                  title: 'Unlock the ultimate driving experience',
                  desc: 'Provide local & international car rentals at affordable rates that you will no longer have to pay high commissions.',
                },
                {
                  title: 'Collect your real life driving license',
                  desc: 'Provide local & international car rentals at affordable rates that you will no longer have to pay high commissions.',
                },
                {
                  title: 'Drive out to your next weekend getaway',
                  desc: 'Provide local & international car rentals at affordable rates that you will no longer have to pay high commissions.',
                },
              ].map((step, idx) => (
                <Group key={idx} align="flex-start" wrap="nowrap">
                  <ThemeIcon size={32} radius="xl" color={redBg}>
                    {idx + 1}
                  </ThemeIcon>
                  <Box>
                    <Text fw={700} mb={4}>
                      {step.title}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {step.desc}
                    </Text>
                  </Box>
                </Group>
              ))}
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      <Container size="xl" py={60}>
        <Group justify="space-between" align="flex-end" mb={40}>
          <Title order={2} style={{ maxWidth: 300 }} lh={1.2}>
            Choose the car that suits you
          </Title>
          <Group gap="xs" style={{ cursor: 'pointer' }}>
            <Text fw={700}>View All</Text>
            <IconChevronDown size={16} />
          </Group>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
          {[
            { brand: 'Mercedes', price: '$45', name: 'G-Class' },
            { brand: 'Mercedes', price: '$50', name: 'S-Class' },
            { brand: 'Mercedes', price: '$45', name: 'C-Class' },
            { brand: 'Porsche', price: '$90', name: '911' },
            { brand: 'Toyota', price: '$30', name: 'Camry' },
            { brand: 'Porsche', price: '$80', name: 'Cayenne' },
          ].map((car, idx) => (
            <Card key={idx} padding="lg" radius="md" bg="#f8f9fa">
              <Box
                bg="#e9ecef"
                h={150}
                mb="md"
                style={{
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconCar size={80} color="#adb5bd" />
              </Box>
              <Group justify="space-between" mb="xs">
                <Box>
                  <Text fw={700}>{car.brand}</Text>
                  <Text size="xs" c="dimmed">
                    {car.name}
                  </Text>
                </Box>
                <Box ta="right">
                  <Text fw={700} c={redBg}>
                    {car.price}
                  </Text>
                  <Text size="xs" c="dimmed">
                    / day
                  </Text>
                </Box>
              </Group>

              <Divider my="sm" color="gray.3" />

              <Group justify="space-between" mb="md" wrap="nowrap">
                <Group gap={4} wrap="nowrap">
                  <IconManualGearbox size={14} color="gray" />
                  <Text size="xs" c="dimmed">
                    Automatic
                  </Text>
                </Group>
                <Group gap={4} wrap="nowrap">
                  <IconUsers size={14} color="gray" />
                  <Text size="xs" c="dimmed">
                    4 Seats
                  </Text>
                </Group>
                <Group gap={4} wrap="nowrap">
                  <IconAirConditioning size={14} color="gray" />
                  <Text size="xs" c="dimmed">
                    Air Conditioned
                  </Text>
                </Group>
              </Group>

              <Button fullWidth bg={redBg} radius="md">
                View Details
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      <Box bg={redBg} py={60} style={{ borderRadius: 20 }} my={40}>
        <Container size="xl">
          <Stack align="center" mb={40}>
            <Title c="white" order={2}>
              Facts In Numbers
            </Title>
            <Text c="white" opacity={0.8} ta="center" maw={600} size="sm">
              Discover local and international car rentals at affordable rates.
              The ultimate driving experience is just a booking away.
            </Text>
          </Stack>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
            {[
              { num: '640+', label: 'Cars', icon: <IconCar size={24} /> },
              {
                num: '20K+',
                label: 'Customers',
                icon: <IconUsers size={24} />,
              },
              {
                num: '15+',
                label: 'Years',
                icon: <IconCalendarEvent size={24} />,
              },
              { num: '30M+', label: 'Miles', icon: <IconMapPin size={24} /> },
            ].map((fact, idx) => (
              <Card key={idx} radius="md" p="md">
                <Group wrap="nowrap">
                  <ThemeIcon size={48} radius="md" bg={orangeBtn}>
                    {fact.icon}
                  </ThemeIcon>
                  <Box>
                    <Text fw={800} size="xl" lh={1.1}>
                      {fact.num}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {fact.label}
                    </Text>
                  </Box>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Container size="xl" py={80}>
        <Grid align="center" gap={60}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2} mb="md" size={40} lh={1.2}>
              Download
              <br />
              mobile app
            </Title>
            <Text c="dimmed" mb="xl">
              Provide local & international car rentals at affordable rates that
              you will no longer have to pay high commissions. The ultimate
              driving experience is just a tap away.
            </Text>
            <Group>
              <Button
                size="xl"
                bg="black"
                leftSection={<IconBrandApple size={24} />}
                radius="md"
                style={{ flex: 1 }}
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
                style={{ flex: 1 }}
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
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Group
              justify="center"
              style={{ position: 'relative', height: 400 }}
            >
              <Box
                w={200}
                h={400}
                bg="white"
                style={{
                  border: '8px solid black',
                  borderRadius: 40,
                  position: 'absolute',
                  zIndex: 1,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
              />
              <Box
                w={200}
                h={350}
                bg="white"
                style={{
                  border: '8px solid black',
                  borderRadius: 40,
                  position: 'absolute',
                  right: 40,
                  top: 25,
                  zIndex: 0,
                  opacity: 0.8,
                }}
              />
            </Group>
          </Grid.Col>
        </Grid>
      </Container>

      <Box bg={redBg} py={60} style={{ borderRadius: 20 }} mt={40}>
        <Container size="xl">
          <Grid align="center">
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Title c="white" order={2} size={36} mb="sm" lh={1.2}>
                Enjoy every mile with
                <br />
                adorable companionship.
              </Title>
              <Text c="white" opacity={0.8} mb="xl" size="sm" maw={400}>
                Provide local & international car rentals at affordable rates
                that you will no longer have to pay high commissions.
              </Text>
              <Box
                style={{
                  backgroundColor: 'white',
                  padding: 8,
                  borderRadius: 30,
                  display: 'flex',
                  maxWidth: 400,
                }}
              >
                <TextInput
                  placeholder="Enter your email"
                  variant="unstyled"
                  style={{ flex: 1, paddingLeft: 10 }}
                />
                <Button radius="xl" bg={orangeBtn}>
                  Subscribe
                </Button>
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Group justify="flex-end">
                <IconCar size={250} color="rgba(0,0,0,0.2)" stroke={0.5} />
              </Group>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
