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
  Select,
  TextInput,
  Button,
} from '@mantine/core'
import {
  IconMapPin,
  IconMail,
  IconPhone,
  IconClock,
  IconChevronDown,
  IconCalendarEvent,
} from '@tabler/icons-react'

export const Contact = () => {
  const redBg = '#990033'
  const orangeBtn = '#F59E0B'

  return (
    <Box pb={80}>
      <Container size="xl" py={40}>
        <Stack align="center" mb={60}>
          <Title order={1} size={48} fw={900}>
            Contact Us
          </Title>
          <Text c="dimmed">
            Home /{' '}
            <Text span fw={600} c="black">
              Contact Us
            </Text>
          </Text>
        </Stack>

        <Grid gap={40} mb={100}>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card p={40} radius="xl" bg={redBg} style={{ height: '100%' }}>
              <Title order={3} c="white" ta="center" mb="xl">
                Book your car
              </Title>
              <Stack gap="md">
                <Select
                  placeholder="Car type"
                  data={['SUV', 'Sedan', 'Coupe', 'Hatchback']}
                  rightSection={<IconChevronDown size={16} />}
                  styles={{
                    input: {
                      backgroundColor: 'transparent',
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                />
                <Select
                  placeholder="Place of rental"
                  data={['New York', 'London', 'Berlin', 'Paris']}
                  rightSection={<IconChevronDown size={16} />}
                  styles={{
                    input: {
                      backgroundColor: 'transparent',
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                />
                <Select
                  placeholder="Place of return"
                  data={['New York', 'London', 'Berlin', 'Paris']}
                  rightSection={<IconChevronDown size={16} />}
                  styles={{
                    input: {
                      backgroundColor: 'transparent',
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                />
                <TextInput
                  placeholder="Rental date"
                  rightSection={<IconCalendarEvent size={16} color="white" />}
                  styles={{
                    input: {
                      backgroundColor: 'transparent',
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                />
                <TextInput
                  placeholder="Return date"
                  rightSection={<IconCalendarEvent size={16} color="white" />}
                  styles={{
                    input: {
                      backgroundColor: 'transparent',
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                />
                <Button fullWidth size="md" bg={orangeBtn} mt="xl" radius="md">
                  Book now
                </Button>
              </Stack>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Box
              bg="#f1f3f5"
              style={{
                height: '100%',
                minHeight: 400,
                borderRadius: 24,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
            />
          </Grid.Col>
        </Grid>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl" mb={100}>
          <Group wrap="nowrap">
            <ThemeIcon size={48} radius="xl" bg={orangeBtn}>
              <IconMapPin size={24} />
            </ThemeIcon>
            <Box>
              <Text size="sm" c="dimmed">
                Address
              </Text>
              <Text fw={700}>Oxford Ave. Cary, NC 27511</Text>
            </Box>
          </Group>
          <Group wrap="nowrap">
            <ThemeIcon size={48} radius="xl" bg={orangeBtn}>
              <IconMail size={24} />
            </ThemeIcon>
            <Box>
              <Text size="sm" c="dimmed">
                Email
              </Text>
              <Text fw={700}>nwiger@yahoo.com</Text>
            </Box>
          </Group>
          <Group wrap="nowrap">
            <ThemeIcon size={48} radius="xl" bg={orangeBtn}>
              <IconPhone size={24} />
            </ThemeIcon>
            <Box>
              <Text size="sm" c="dimmed">
                Phone
              </Text>
              <Text fw={700}>+537 547-6401</Text>
            </Box>
          </Group>
          <Group wrap="nowrap">
            <ThemeIcon size={48} radius="xl" bg={orangeBtn}>
              <IconClock size={24} />
            </ThemeIcon>
            <Box>
              <Text size="sm" c="dimmed">
                Opening hours
              </Text>
              <Text fw={700}>Sun-Mon: 10am - 10pm</Text>
            </Box>
          </Group>
        </SimpleGrid>

        <Title ta="center" order={2} size={36} mb={60}>
          Latest blog posts & news
        </Title>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mb={100}>
          {[
            {
              title: 'How To Choose The Right Car',
              date: 'News / 12April 2024',
            },
            {
              title: 'Which plan is right for me?',
              date: 'News / 12April 2024',
            },
            {
              title: 'Enjoy Speed, Choice & Total Control',
              date: 'News / 12April 2024',
            },
          ].map((post, i) => (
            <Box key={i}>
              <Box bg="#f1f3f5" h={220} mb="md" style={{ borderRadius: 16 }} />
              <Title order={4} mb="xs">
                {post.title}
              </Title>
              <Text size="sm" c="dimmed">
                {post.date}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        <Box
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
