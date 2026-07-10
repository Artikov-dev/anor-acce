import { useState } from 'react'
import {
  Container,
  Title,
  Group,
  Button,
  SimpleGrid,
  Card,
  Text,
} from '@mantine/core'
import {
  IconCar,
  IconManualGearbox,
  IconGasStation,
  IconSnowflake,
  IconTruck,
  IconBus,
} from '@tabler/icons-react'

const CATEGORIES = [
  { label: 'All vehicles', icon: null },
  { label: 'Sedan', icon: IconCar },
  { label: 'Cabriolet', icon: IconCar },
  { label: 'Pickup', icon: IconTruck },
  { label: 'Suv', icon: IconCar },
  { label: 'Minivan', icon: IconBus },
]

const VEHICLES = [
  {
    id: 1,
    name: 'Mercedes',
    type: 'Sedan',
    price: 25,
    transmission: 'Automat',
    fuel: 'PB 95',
    ac: true,
  },
  {
    id: 2,
    name: 'Mercedes',
    type: 'Sport',
    price: 50,
    transmission: 'Manual',
    fuel: 'PB 95',
    ac: true,
  },
  {
    id: 3,
    name: 'Mercedes',
    type: 'Sedan',
    price: 45,
    transmission: 'Automat',
    fuel: 'PB 95',
    ac: true,
  },
]

export const Catalog = () => {
  const [activeCategory, setActiveCategory] = useState('All vehicles')

  return (
    <Container size="xl" py="xl">
      <Title order={1} size="h1" fw={900} ta="center" mb="xl">
        Select a vehicle group
      </Title>

      <Group gap="sm" justify="center" mb={40}>
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.label
          const Icon = category.icon
          return (
            <Button
              key={category.label}
              variant={isActive ? 'filled' : 'default'}
              color={isActive ? 'violet' : 'gray'}
              radius="xl"
              size="md"
              leftSection={Icon ? <Icon size={20} /> : null}
              onClick={() => setActiveCategory(category.label)}
              bg={isActive ? 'violet' : undefined}
            >
              {category.label}
            </Button>
          )
        })}
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {VEHICLES.map((vehicle) => (
          <Card
            key={vehicle.id}
            padding="lg"
            radius="xl"
            withBorder
            shadow="sm"
          >
            <Group justify="space-between" mt="md" mb="xs">
              <div>
                <Text fw={700} size="xl">
                  {vehicle.name}
                </Text>
                <Text size="sm" c="dimmed">
                  {vehicle.type}
                </Text>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Text fw={700} size="xl" c="violet">
                  ${vehicle.price}
                </Text>
                <Text size="xs" c="dimmed">
                  per day
                </Text>
              </div>
            </Group>

            <Group justify="space-between" mt="lg" mb="xl" wrap="nowrap">
              <Group gap="xs">
                <IconManualGearbox size={18} stroke={1.5} />
                <Text size="sm" c="dimmed">
                  {vehicle.transmission}
                </Text>
              </Group>
              <Group gap="xs">
                <IconGasStation size={18} stroke={1.5} />
                <Text size="sm" c="dimmed">
                  {vehicle.fuel}
                </Text>
              </Group>
              <Group gap="xs">
                <IconSnowflake size={18} stroke={1.5} />
                <Text size="sm" c="dimmed">
                  Air Conditioner
                </Text>
              </Group>
            </Group>

            <Button
              variant="filled"
              color="violet"
              fullWidth
              radius="md"
              size="md"
            >
              View Details
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  )
}
