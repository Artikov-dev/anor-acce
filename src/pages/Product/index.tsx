import {
  Container,
  Title,
  Grid,
  Text,
  Box,
  Group,
  Button,
  SimpleGrid,
  Card,
  ThemeIcon,
} from '@mantine/core'
import {
  IconCar,
  IconManualGearbox,
  IconGasStation,
  IconSnowflake,
  IconDoor,
  IconUsers,
  IconRoad,
  IconCheck,
  IconArrowRight,
} from '@tabler/icons-react'
import { useParams, useNavigate } from 'react-router'
import { VEHICLES } from '@/data/cars'

export const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const vehicle = VEHICLES.find((v) => v.id === id) || VEHICLES[0]

  const redBg = '#990033'

  return (
    <Box pb={80}>
      <Container size="xl" py={40}>
        <Grid gap={60}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box mb="md">
              <Title order={1} size={48} fw={900}>
                {vehicle.name}
              </Title>
              <Group gap={8} align="flex-end">
                <Text fw={800} size="xl" c={redBg} lh={1}>
                  ${vehicle.price}
                </Text>
                <Text size="sm" c="dimmed" lh={1.2}>
                  / day
                </Text>
              </Group>
            </Box>

            <Box
              bg="#f8f9fa"
              style={{
                borderRadius: 20,
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              }}
              mb="md"
            >
              <IconCar size={200} color="#dee2e6" stroke={1} />
            </Box>

            <SimpleGrid cols={3} spacing="md">
              {[1, 2, 3].map((item) => (
                <Box
                  key={item}
                  bg="#f8f9fa"
                  style={{
                    borderRadius: 12,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                  }}
                >
                  <IconCar size={50} color="#dee2e6" stroke={1} />
                </Box>
              ))}
            </SimpleGrid>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }} pt={{ base: 20, md: 100 }}>
            <Title order={3} mb="xl">
              Technical Specification
            </Title>

            <SimpleGrid cols={3} spacing="lg" mb={40}>
              <Box bg="#fafafa" p="md" style={{ borderRadius: 12 }}>
                <IconManualGearbox size={24} stroke={1.5} color="#495057" />
                <Text size="xs" fw={700} mt="sm">
                  Gear Box
                </Text>
                <Text size="xs" c="dimmed">
                  {vehicle.transmission}
                </Text>
              </Box>
              <Box bg="#fafafa" p="md" style={{ borderRadius: 12 }}>
                <IconGasStation size={24} stroke={1.5} color="#495057" />
                <Text size="xs" fw={700} mt="sm">
                  Fuel
                </Text>
                <Text size="xs" c="dimmed">
                  {vehicle.fuel}
                </Text>
              </Box>
              <Box bg="#fafafa" p="md" style={{ borderRadius: 12 }}>
                <IconDoor size={24} stroke={1.5} color="#495057" />
                <Text size="xs" fw={700} mt="sm">
                  Doors
                </Text>
                <Text size="xs" c="dimmed">
                  4
                </Text>
              </Box>
              <Box bg="#fafafa" p="md" style={{ borderRadius: 12 }}>
                <IconSnowflake size={24} stroke={1.5} color="#495057" />
                <Text size="xs" fw={700} mt="sm">
                  Air Conditioner
                </Text>
                <Text size="xs" c="dimmed">
                  {vehicle.ac ? 'Yes' : 'No'}
                </Text>
              </Box>
              <Box bg="#fafafa" p="md" style={{ borderRadius: 12 }}>
                <IconUsers size={24} stroke={1.5} color="#495057" />
                <Text size="xs" fw={700} mt="sm">
                  Seats
                </Text>
                <Text size="xs" c="dimmed">
                  5
                </Text>
              </Box>
              <Box bg="#fafafa" p="md" style={{ borderRadius: 12 }}>
                <IconRoad size={24} stroke={1.5} color="#495057" />
                <Text size="xs" fw={700} mt="sm">
                  Distance
                </Text>
                <Text size="xs" c="dimmed">
                  Unlimited
                </Text>
              </Box>
            </SimpleGrid>

            <Button
              bg={redBg}
              size="lg"
              radius="md"
              style={{ width: '200px' }}
              mb={40}
            >
              Rent a car
            </Button>

            <Title order={3} mb="xl">
              Car Equipment
            </Title>

            <SimpleGrid cols={2} spacing="md">
              {[
                'ABS',
                'Air Bags',
                'Cruise Control',
                'Air Conditioner',
                'Parking Sensors',
                'Bluetooth',
              ].map((eq) => (
                <Group key={eq} gap="sm" wrap="nowrap">
                  <ThemeIcon radius="xl" size={20} bg={redBg}>
                    <IconCheck size={12} stroke={3} />
                  </ThemeIcon>
                  <Text size="sm" c="dimmed" fw={500}>
                    {eq}
                  </Text>
                </Group>
              ))}
            </SimpleGrid>
          </Grid.Col>
        </Grid>

        <Box mt={80}>
          <Group justify="space-between" align="flex-end" mb={40}>
            <Title order={2} size={36}>
              Other cars
            </Title>
            <Group
              gap="xs"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/catalog')}
            >
              <Text fw={700}>View All</Text>
              <IconArrowRight size={18} />
            </Group>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {VEHICLES.slice(0, 3).map((v) => (
              <Card
                key={v.id}
                padding="xl"
                radius="md"
                bg="#fafafa"
                style={{
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                }}
              >
                <Box
                  bg="#f1f3f5"
                  h={200}
                  mb="lg"
                  style={{
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconCar size={120} color="#dee2e6" stroke={1} />
                </Box>

                <Group justify="space-between" align="flex-start" mb="xl">
                  <div>
                    <Text fw={800} size="xl" lh={1}>
                      {v.name}
                    </Text>
                    <Text size="sm" c="dimmed" mt={8}>
                      {v.type}
                    </Text>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Text fw={800} size="xl" c={redBg} lh={1}>
                      ${v.price}
                    </Text>
                    <Text size="xs" c="dimmed" mt={8}>
                      per day
                    </Text>
                  </div>
                </Group>

                <Group justify="space-between" mb="xl" wrap="nowrap">
                  <Group gap={6}>
                    <IconManualGearbox size={20} stroke={1.5} color="#495057" />
                    <Text size="xs" c="dimmed" fw={600}>
                      {v.transmission}
                    </Text>
                  </Group>
                  <Group gap={6}>
                    <IconGasStation size={20} stroke={1.5} color="#495057" />
                    <Text size="xs" c="dimmed" fw={600}>
                      {v.fuel}
                    </Text>
                  </Group>
                  <Group gap={6}>
                    <IconSnowflake size={20} stroke={1.5} color="#495057" />
                    <Text size="xs" c="dimmed" fw={600}>
                      {v.ac ? 'Air Conditioner' : 'No AC'}
                    </Text>
                  </Group>
                </Group>

                <Button
                  bg={redBg}
                  fullWidth
                  radius="md"
                  size="md"
                  onClick={() => navigate(`/product/${v.id}`)}
                  style={{ transition: 'background-color 0.2s' }}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  )
}
