import {
  AppShell,
  Group,
  Text,
  Container,
  ThemeIcon,
  Stack,
  Grid,
  Title,
  Box,
  Button,
  Divider,
} from '@mantine/core'
import { Outlet, Link, useLocation } from 'react-router'
import {
  IconCar,
  IconPhoneFilled,
  IconMapPin,
  IconMail,
  IconBrandApple,
  IconBrandGooglePlay,
} from '@tabler/icons-react'

export const Layout = () => {
  const location = useLocation()

  return (
    <AppShell header={{ height: 80 }} padding="md">
      <AppShell.Header>
        <Container size="xl" h="100%">
          <Group h="100%" px="md" justify="space-between">
            {}
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Group gap="xs">
                <IconCar size={32} />
                <Text fw={700} size="xl">
                  Anor shop
                </Text>
              </Group>
            </Link>

            {}
            <Group gap="xl">
              <Text
                component={Link}
                to="/"
                fw={location.pathname === '/' ? 700 : 500}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Home
              </Text>
              <Text
                component={Link}
                to="/catalog"
                fw={location.pathname === '/catalog' ? 700 : 500}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Vehicles
              </Text>
              <Text
                component={Link}
                to="/details"
                fw={location.pathname === '/details' ? 700 : 500}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Details
              </Text>
              <Text
                component={Link}
                to="/about"
                fw={location.pathname === '/about' ? 700 : 500}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                About Us
              </Text>
              <Text
                component={Link}
                to="/contact"
                fw={location.pathname === '/contact' ? 700 : 500}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Contact Us
              </Text>
            </Group>

            {}
            <Group gap="sm">
              <ThemeIcon radius="xl" size="xl" color="#ff0000ff">
                <IconPhoneFilled size={20} />
              </ThemeIcon>
              <Stack gap={0}>
                <Text size="sm" c="dimmed" lh={1.2}>
                  Need help?
                </Text>
                <Text size="sm" fw={700} lh={1.2}>
                  +996 247-1680
                </Text>
              </Stack>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <AppShell.Footer p="xl" style={{ position: 'static' }}>
        <Container size="xl">
          <Grid>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Group gap="xs" mb="md">
                <IconCar size={32} />
                <Text fw={700} size="xl">
                  Car Rental
                </Text>
              </Group>
              <Text size="sm" c="dimmed" mb="md">
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas.
              </Text>
              <Group gap="sm">
                <ThemeIcon radius="xl" color="gray" variant="light">
                  <IconPhoneFilled size={16} />
                </ThemeIcon>
                <ThemeIcon radius="xl" color="gray" variant="light">
                  <IconPhoneFilled size={16} />
                </ThemeIcon>
                <ThemeIcon radius="xl" color="gray" variant="light">
                  <IconPhoneFilled size={16} />
                </ThemeIcon>
              </Group>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 2 }}>
              <Title order={5} mb="md">
                Useful Links
              </Title>
              <Stack gap="xs">
                <Text
                  component={Link}
                  to="/about"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  About Us
                </Text>
                <Text size="sm" c="dimmed">
                  Terms of Use
                </Text>
                <Text size="sm" c="dimmed">
                  Privacy Policy
                </Text>
                <Text size="sm" c="dimmed">
                  Help
                </Text>
                <Text
                  component={Link}
                  to="/contact"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  Contact Us
                </Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 2 }}>
              <Title order={5} mb="md">
                Vehicles
              </Title>
              <Stack gap="xs">
                <Text
                  component={Link}
                  to="/catalog"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  Coupe
                </Text>
                <Text
                  component={Link}
                  to="/catalog"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  Sedan
                </Text>
                <Text
                  component={Link}
                  to="/catalog"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  SUV
                </Text>
                <Text
                  component={Link}
                  to="/catalog"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  Minivan
                </Text>
                <Text
                  component={Link}
                  to="/catalog"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  Pickup
                </Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <Stack gap="md">
                <Group wrap="nowrap">
                  <ThemeIcon radius="xl" color="orange" variant="light">
                    <IconMapPin size={16} />
                  </ThemeIcon>
                  <Box>
                    <Text size="xs" c="dimmed">
                      Address
                    </Text>
                    <Text size="sm" fw={500}>
                      New York, NY 10012, US
                    </Text>
                  </Box>
                </Group>
                <Group wrap="nowrap">
                  <ThemeIcon radius="xl" color="orange" variant="light">
                    <IconMail size={16} />
                  </ThemeIcon>
                  <Box>
                    <Text size="xs" c="dimmed">
                      Email
                    </Text>
                    <Text size="sm" fw={500}>
                      info@example.com
                    </Text>
                  </Box>
                </Group>
                <Group wrap="nowrap">
                  <ThemeIcon radius="xl" color="red" variant="light">
                    <IconPhoneFilled size={16} />
                  </ThemeIcon>
                  <Box>
                    <Text size="xs" c="dimmed">
                      Phone
                    </Text>
                    <Text size="sm" fw={500}>
                      +996 247-1680
                    </Text>
                  </Box>
                </Group>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 2 }}>
              <Title order={5} mb="md">
                Download App
              </Title>
              <Stack gap="sm">
                <Button
                  size="md"
                  bg="black"
                  leftSection={<IconBrandApple size={20} />}
                  radius="md"
                  style={{ justifyContent: 'flex-start' }}
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
                  size="md"
                  bg="black"
                  leftSection={<IconBrandGooglePlay size={20} />}
                  radius="md"
                  style={{ justifyContent: 'flex-start' }}
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
              </Stack>
            </Grid.Col>
          </Grid>

          <Divider my="xl" />
          <Text ta="center" size="sm" c="dimmed">
            © Copyright 2024. Created with ❤️ by Anor.
          </Text>
        </Container>
      </AppShell.Footer>
    </AppShell>
  )
}
