import {
  Container,
  Title,
  Text,
  Grid,
  SimpleGrid,
  Box,
  Stack,
  Card,
  Avatar,
  Accordion,
  Image,
} from '@mantine/core'

export const About = () => {
  const redBg = '#d90008'

  return (
    <Box pb={80}>
      <Container size="xl" py={40}>
        <Stack align="center" mb={60}>
          <Title order={1} size={48} fw={900}>
            Biz Haqimizda
          </Title>
          <Text c="dimmed">
            Bosh sahifa /{' '}
            <Text span fw={600} c="black">
              Biz Haqimizda
            </Text>
          </Text>
        </Stack>

        <Grid gap={60} mb={80} align="center">
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Title order={2} size={40} fw={900} lh={1.1}>
              Har bir haydash safari qulay va xavfsiz bo'lsin
            </Title>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
              <Box>
                <Title order={4} mb="xs">
                  Keng turdagi avtomobillar
                </Title>
                <Text size="sm" c="dimmed">
                  Kichik shaharlararo mashinalardan tortib lyuks
                  krossoverlargacha mavjud.
                </Text>
              </Box>
              <Box>
                <Title order={4} mb="xs">
                  Yuqori xizmat ko'rsatish
                </Title>
                <Text size="sm" c="dimmed">
                  Mijozlarimiz uchun tunu-kun professional qo'llab-quvvatlash
                  xizmati.
                </Text>
              </Box>
              <Box>
                <Title order={4} mb="xs">
                  Erkin harakatlanish
                </Title>
                <Text size="sm" c="dimmed">
                  O'zbekistonning istalgan nuqtasiga qulay shartlarda sayohat
                  qiling.
                </Text>
              </Box>
              <Box>
                <Title order={4} mb="xs">
                  Hamyonbop narxlar
                </Title>
                <Text size="sm" c="dimmed">
                  Hech qanday yashirin to'lovlarsiz shaffof va arzon ijara
                  tariflari.
                </Text>
              </Box>
            </SimpleGrid>
          </Grid.Col>
        </Grid>

        <Box mb={80} style={{ borderRadius: 24, overflow: 'hidden' }}>
          <Image
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
            h={400}
            alt="Anor Rental Car Fleet"
            style={{ objectFit: 'cover' }}
          />
        </Box>

        <SimpleGrid cols={{ base: 1, sm: 3 }} mb={100} ta="center">
          <Box>
            <Title size={64} c={redBg} fw={900}>
              15K+
            </Title>
            <Text fw={700} size="lg">
              Mamnun mijozlar
            </Text>
          </Box>
          <Box>
            <Title size={64} c={redBg} fw={900}>
              500+
            </Title>
            <Text fw={700} size="lg">
              Avtomobillar soni
            </Text>
          </Box>
          <Box>
            <Title size={64} c={redBg} fw={900}>
              10+
            </Title>
            <Text fw={700} size="lg">
              Yillik tajriba
            </Text>
          </Box>
        </SimpleGrid>

        <Title ta="center" order={2} size={36} mb={40}>
          Mijozlarimiz izohlari
        </Title>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mb={100}>
          {[
            {
              name: 'Sardor Rahimov',
              role: 'Mijoz',
              text: 'Anor Rental xizmatidan juda mamnunman. Avtomobil toza va texnik soz holatda topshirildi. Rahmat!',
            },
            {
              name: 'Jahongir Olimov',
              role: 'Tadbirkor',
              text: "Biznes uchrashuvim uchun Mercedes S-Class ijaraga oldim. Xizmat ko'rsatish yuqori darajada.",
            },
            {
              name: 'Malika Yoqubova',
              role: 'Mijoz',
              text: 'Samarqandga sayohat uchun krossover oldik. Narxlari boshqalarga qaraganda juda qulay.',
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
            Eng Ko'p Beriladigan Savollar
          </Title>
        </Stack>
        <Box maw={800} mx="auto">
          <Accordion variant="separated" radius="md">
            {[
              'Avtomobilni qanday ijaraga olish mumkin?',
              'Ijara uchun qanday hujjatlar talab qilinadi?',
              "Avtomobilni boshqa shaharda topshirsa bo'ladimi?",
              "Sug'urta xizmati narxga kiradimi?",
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
                    Saytimiz orqali kerakli avtomobilni tanlab, savatga qo'shing
                    va buyurtma bering. Operatorlarimiz 15 daqiqa ichida siz
                    bilan bog'lanib, shartnomani rasmiylashtiradilar.
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
