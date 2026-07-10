import { useState } from 'react'
import {
  Container,
  Title,
  Group,
  Button,
  SimpleGrid,
  Card,
  Text,
  Box,
} from '@mantine/core'
import {
  IconCar,
  IconManualGearbox,
  IconGasStation,
  IconSnowflake,
  IconTruck,
  IconBus,
} from '@tabler/icons-react'
import { useNavigate } from 'react-router'
import { VEHICLES } from '@/data/cars'

const CATEGORIES = [
  { label: 'All vehicles', icon: null },
  { label: 'Sedan', icon: IconCar },
  { label: 'Cabriolet', icon: IconCar },
  { label: 'Pickup', icon: IconTruck },
  { label: 'Suv', icon: IconCar },
  { label: 'Minivan', icon: IconBus },
]

export const Catalog = () => {
  const [activeCategory, setActiveCategory] = useState('All vehicles')
  const navigate = useNavigate()

  const redBg = '#990033'

  const filteredVehicles =
    activeCategory === 'All vehicles'
      ? VEHICLES
      : VEHICLES.filter(
          (vehicle) =>
            vehicle.type.toLowerCase() === activeCategory.toLowerCase()
        )

  return (
    <Box pb={80}>
      <Container size="xl" py={60}>
        <Title order={1} size={40} fw={900} ta="center" mb={40}>
          Select a vehicle group
        </Title>

        <Group gap="sm" justify="center" mb={60}>
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.label
            const Icon = category.icon
            return (
              <Button
                key={category.label}
                variant={isActive ? 'filled' : 'light'}
                radius="xl"
                size="md"
                leftSection={Icon ? <Icon size={18} /> : null}
                onClick={() => setActiveCategory(category.label)}
                bg={isActive ? redBg : '#f8f9fa'}
                c={isActive ? 'white' : '#212529'}
                style={{ border: 'none', transition: 'all 0.2s ease' }}
              >
                {category.label}
              </Button>
            )
          })}
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
          {filteredVehicles.map((vehicle) => (
            <Card
              key={vehicle.id}
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
                    {vehicle.name}
                  </Text>
                  <Text size="sm" c="dimmed" mt={8}>
                    {vehicle.type}
                  </Text>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Text fw={800} size="xl" c={redBg} lh={1}>
                    ${vehicle.price}
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
                    {vehicle.transmission}
                  </Text>
                </Group>
                <Group gap={6}>
                  <IconGasStation size={20} stroke={1.5} color="#495057" />
                  <Text size="xs" c="dimmed" fw={600}>
                    {vehicle.fuel}
                  </Text>
                </Group>
                <Group gap={6}>
                  <IconSnowflake size={20} stroke={1.5} color="#495057" />
                  <Text size="xs" c="dimmed" fw={600}>
                    {vehicle.ac ? 'Air Conditioner' : 'No AC'}
                  </Text>
                </Group>
              </Group>

              <Button
                bg={redBg}
                fullWidth
                radius="md"
                size="md"
                onClick={() => navigate(`/product/${vehicle.id}`)}
                style={{ transition: 'background-color 0.2s' }}
              >
                View Details
              </Button>
            </Card>
          ))}
        </SimpleGrid>

        {/* Brands bar */}
        <Box
          mt={80}
          py={40}
          px={{ base: 20, md: 60 }}
          bg="#fafafa"
          style={{ borderRadius: 40 }}
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
              Jeep
            </Title>
            <Title order={3} fw={900} style={{ letterSpacing: 1 }}>
              BMW
            </Title>
            <Title order={3} fw={300} style={{ fontStyle: 'italic' }}>
              Audi
            </Title>
          </Group>
        </Box>
      </Container>
    </Box>
  )
}
