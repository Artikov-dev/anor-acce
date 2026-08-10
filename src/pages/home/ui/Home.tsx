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
  ThemeIcon,
  Title,
  Divider,
  Image,
} from '@mantine/core'
import { IconCar, IconShieldCheck, IconClock } from '@tabler/icons-react'
import { useNavigate } from 'react-router'
import { useCartStore } from '@/entities/cart'
import { notifications } from '@mantine/notifications'

const redBg = '#d90008'
const orangeBtn = '#F59E0B'

export const Home = () => {
  const navigate = useNavigate()
  const addToCart = useCartStore((state) => state.addToCart)

  const featuredCars = [
    {
      id: 101,
      title: 'Mercedes-Benz G-Class',
      brand: 'Mercedes',
      price: 150,
      image:
        'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=600&q=80',
      description: "Zamonaviy lyuks yo'ltanlamas avtomobil.",
      category: { id: 1, name: 'Lyuks' },
    },
    {
      id: 102,
      title: 'BMW M5 Competition',
      brand: 'BMW',
      price: 180,
      image:
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80',
      description: 'Yuqori tezlik va maksimal qulaylik.',
      category: { id: 1, name: 'Sport' },
    },
    {
      id: 103,
      title: 'Porsche 911 Carrera',
      brand: 'Porsche',
      price: 220,
      image:
        'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80',
      description: "Haqiqiy sport avtomobili tuyg'usi.",
      category: { id: 1, name: 'Sport' },
    },
    {
      id: 104,
      title: 'Audi RS6 Avant',
      brand: 'Audi',
      price: 160,
      image:
        'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=600&q=80',
      description: 'Oila va sport uchun eng mukammal krossover.',
      category: { id: 2, name: 'Biznes' },
    },
    {
      id: 105,
      title: 'Range Rover Autobiography',
      brand: 'Range Rover',
      price: 200,
      image:
        'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
      description: 'Eng oliy darajadagi qulaylik va xavfsizlik.',
      category: { id: 1, name: 'Lyuks' },
    },
    {
      id: 106,
      title: 'Tesla Model S Plaid',
      brand: 'Tesla',
      price: 170,
      image:
        'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=600&q=80',
      description: 'Zamonaviy elektrokar texnologiyalari.',
      category: { id: 3, name: 'Elektro' },
    },
  ]

  const handleQuickAdd = (car: (typeof featuredCars)[0]) => {
    addToCart({
      id: car.id,
      title: car.title,
      price: car.price,
      description: car.description,
      images: [car.image],
      slug: car.brand.toLowerCase(),
      category: {
        id: car.category.id,
        name: car.category.name,
        slug: car.category.name.toLowerCase(),
        image: '',
      },
    })
    notifications.show({
      title: "Savatga qo'shildi!",
      message: `${car.title} savatga qo'shildi`,
      color: 'green',
    })
  }

  return (
    <Box pb={80}>
      <Container size="xl">
        <Box
          bg={redBg}
          c="white"
          style={{
            borderRadius: 24,
            position: 'relative',
            overflow: 'hidden',
            minHeight: 520,
            marginTop: 20,
            backgroundImage:
              'linear-gradient(135deg, #d90008 0%, #8c0005 100%)',
          }}
          p={{ base: 'xl', md: 60 }}
        >
          <Grid gap={50} align="center">
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Title c="white" size={48} fw={900} lh={1.1} mb="md">
                Yo'lingizda qulaylik va tezlikni his eting
              </Title>
              <Text c="white" size="lg" mb="xl" opacity={0.9} maw={520}>
                Anor Rental bilan orzungizdagi avtomobilni qulay shartlarda va
                arzon narxda ijaraga oling. Cheklovlarsiz haydash rohatini
                tuying!
              </Text>
              <Group gap="md">
                <Button
                  size="lg"
                  bg={orangeBtn}
                  radius="md"
                  onClick={() => navigate('/catalog')}
                >
                  Katalogni ko'rish
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  c="white"
                  style={{ borderColor: 'white' }}
                  radius="md"
                  onClick={() => navigate('/register')}
                >
                  Ro'yxatdan o'tish
                </Button>
              </Group>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 5 }}>
              <Card radius="xl" p="xl" withBorder shadow="xl" bg="white">
                <Title order={3} ta="center" mb="xl" c="dark">
                  Avtomobil band qilish
                </Title>
                <Stack gap="md">
                  <Select
                    label="Avtomobil turi"
                    placeholder="Tanlang"
                    data={[
                      "SUV / Yo'ltanlamas",
                      'Sedan',
                      'Sport / Coupe',
                      'Elektrokar',
                    ]}
                  />
                  <Select
                    label="Olish joyi"
                    placeholder="Manzilni tanlang"
                    data={[
                      'Toshkent (Markaz)',
                      'Aeroport',
                      'Samarqand',
                      'Buxoro',
                    ]}
                  />
                  <Select
                    label="Qaytarish joyi"
                    placeholder="Manzilni tanlang"
                    data={[
                      'Toshkent (Markaz)',
                      'Aeroport',
                      'Samarqand',
                      'Buxoro',
                    ]}
                  />
                  <Button
                    fullWidth
                    size="md"
                    bg={redBg}
                    mt="sm"
                    onClick={() => navigate('/catalog')}
                  >
                    Hozir qidirish
                  </Button>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </Box>
      </Container>

      <Container size="xl" py={80}>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing={40}>
          <Stack align="center" ta="center">
            <ThemeIcon size={56} radius="xl" color="red">
              <IconCar size={32} />
            </ThemeIcon>
            <Title order={3}>Keng tanlov</Title>
            <Text c="dimmed" size="sm">
              Eng so'nggi rusumdagi biznes, sport va yo'ltanlamas
              avtomobillarning katta katalogi.
            </Text>
          </Stack>
          <Stack align="center" ta="center">
            <ThemeIcon size={56} radius="xl" color="red">
              <IconShieldCheck size={32} />
            </ThemeIcon>
            <Title order={3}>To'liq xavfsizlik</Title>
            <Text c="dimmed" size="sm">
              Barcha avtomobillarimiz texnik ko'rikdan o'tgan va to'liq
              sugurtalangan.
            </Text>
          </Stack>
          <Stack align="center" ta="center">
            <ThemeIcon size={56} radius="xl" color="red">
              <IconClock size={32} />
            </ThemeIcon>
            <Title order={3}>24/7 Qo'llab-quvvatlash</Title>
            <Text c="dimmed" size="sm">
              Haftaning 7 kuni, 24 soat davomida operatorlarimiz yordam berishga
              tayyor.
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>

      <Container size="xl" py={40}>
        <Group justify="space-between" align="flex-end" mb={40}>
          <Box>
            <Title order={2} size={36} fw={900}>
              Sizga mos keladigan avtomobilni tanlang
            </Title>
            <Text c="dimmed" size="sm" mt={4}>
              Eng ko'p ijaraga olingan ommabop avtomobillar
            </Text>
          </Box>
          <Button
            variant="light"
            color="red"
            onClick={() => navigate('/catalog')}
          >
            Barchasini ko'rish &rarr;
          </Button>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
          {featuredCars.map((car) => (
            <Card key={car.id} padding="lg" radius="xl" withBorder shadow="sm">
              <Card.Section pos="relative">
                <Image
                  src={car.image}
                  h={220}
                  alt={car.title}
                  style={{ objectFit: 'cover' }}
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Box>
                  <Text fw={800} size="lg">
                    {car.title}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {car.brand}
                  </Text>
                </Box>
                <Box ta="right">
                  <Text fw={900} c={redBg} size="xl">
                    ${car.price}
                  </Text>
                  <Text size="xs" c="dimmed">
                    / kuniga
                  </Text>
                </Box>
              </Group>

              <Text size="sm" c="dimmed" lineClamp={2} mb="md">
                {car.description}
              </Text>

              <Divider my="sm" color="gray.2" />

              <Group justify="space-between" mt="md">
                <Button
                  variant="default"
                  radius="md"
                  style={{ flex: 1 }}
                  onClick={() => navigate('/catalog')}
                >
                  Batafsil
                </Button>
                <Button
                  bg={redBg}
                  radius="md"
                  style={{ flex: 1 }}
                  onClick={() => handleQuickAdd(car)}
                >
                  Savatga
                </Button>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      <Box bg={redBg} py={60} style={{ borderRadius: 24 }} my={60}>
        <Container size="xl">
          <Stack align="center" mb={40}>
            <Title c="white" order={2} size={36}>
              Raqamlardagi Natijalarimiz
            </Title>
            <Text c="white" opacity={0.9} ta="center" maw={600} size="sm">
              Anor Rental orqali minglab mijozlar o'z sayohatlarini unutilmas va
              qulay tarzda amalga oshirishdi.
            </Text>
          </Stack>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
            {[
              { num: '500+', label: 'Avtomobillar' },
              { num: '15K+', label: 'Mamnun mijozlar' },
              { num: '10+', label: 'Yillik tajriba' },
              { num: '24/7', label: "Mijozlarga ko'mak" },
            ].map((fact, idx) => (
              <Card key={idx} radius="lg" p="xl" ta="center">
                <Text fw={900} size="32px" c={redBg} lh={1.1}>
                  {fact.num}
                </Text>
                <Text size="sm" fw={600} c="dimmed" mt={4}>
                  {fact.label}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  )
}
