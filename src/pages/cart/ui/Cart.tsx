import React, { useState } from 'react'
import {
  Container,
  Title,
  Text,
  Grid,
  Card,
  Image,
  Button,
  Group,
  Stack,
  ActionIcon,
  Badge,
  Box,
  Divider,
  Center,
  Modal,
  TextInput,
} from '@mantine/core'
import {
  IconTrash,
  IconShoppingCart,
  IconPlus,
  IconMinus,
  IconCheck,
} from '@tabler/icons-react'
import { useNavigate, Link } from 'react-router'
import { useCartStore } from '@/entities/cart'
import { notifications } from '@mantine/notifications'
import { modals } from '@mantine/modals'

export const Cart: React.FC = () => {
  const navigate = useNavigate()
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } =
    useCartStore()
  const [checkoutOpened, setCheckoutOpened] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')

  const redBg = '#d90008'
  const totalPrice = getTotalPrice()

  const handleRemove = (id: number, title: string) => {
    removeFromCart(id)
    notifications.show({
      title: "O'chirildi",
      message: `${title} savatdan olib tashlandi`,
      color: 'gray',
    })
  }

  const handleClearCartModal = () => {
    modals.openConfirmModal({
      title: 'Savatni tozalash',
      centered: true,
      children: (
        <Text size="sm">
          Siz rostdan ham savatdagi barcha mahsulotlarni o'chirmoqchimisiz?
        </Text>
      ),
      labels: { confirm: 'Tozalash', cancel: 'Bekor qilish' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        clearCart()
        notifications.show({
          title: 'Tozalandi',
          message: 'Savat tozalandi',
          color: 'blue',
        })
      },
    })
  }

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setCheckoutOpened(false)
      clearCart()
      notifications.show({
        title: 'Muvaffaqiyatli!',
        message:
          "Buyurtmangiz qabul qilindi! Tez orada operatormiz bog'lanadi.",
        color: 'green',
        icon: <IconCheck size={18} />,
      })
      navigate('/catalog')
    }, 1000)
  }

  if (items.length === 0) {
    return (
      <Container size="md" py={80}>
        <Card radius="xl" p={50} withBorder shadow="sm" ta="center">
          <Center mb="lg">
            <Box
              bg="red.0"
              p="xl"
              style={{ borderRadius: '50%', color: redBg }}
            >
              <IconShoppingCart size={64} />
            </Box>
          </Center>
          <Title order={2} mb="xs">
            Savatingiz hozircha bo'sh
          </Title>
          <Text c="dimmed" mb="xl" maw={450} mx="auto">
            Katalog bo'limiga o'tib, o'zingizga ma'qul kelgan avtomobil yoki
            mahsulotlarni savatga qo'shing.
          </Text>
          <Button
            size="lg"
            color="red"
            radius="md"
            component={Link}
            to="/catalog"
            leftSection={<IconShoppingCart size={20} />}
          >
            Katalogga o'tish
          </Button>
        </Card>
      </Container>
    )
  }

  return (
    <Container size="xl" py={40}>
      <Modal
        opened={checkoutOpened}
        onClose={() => setCheckoutOpened(false)}
        title="Buyurtmani rasmiylashtirish"
        centered
        radius="lg"
      >
        <form onSubmit={handleCheckoutSubmit}>
          <Stack gap="md">
            <Text size="sm" c="dimmed">
              Umumiy summa:{' '}
              <Text span fw={800} c={redBg}>
                ${totalPrice.toLocaleString()}
              </Text>
            </Text>
            <TextInput
              label="Ismingiz"
              placeholder="Masalan: Ali Valiyev"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <TextInput
              label="Telefon raqamingiz"
              placeholder="+998 90 123 45 67"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
            <Button
              type="submit"
              color="red"
              size="md"
              fullWidth
              loading={isSubmitting}
              mt="md"
            >
              Buyurtmani tasdiqlash
            </Button>
          </Stack>
        </form>
      </Modal>

      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Box>
            <Title order={1} size={36} fw={900}>
              Savat
            </Title>
            <Text c="dimmed" size="sm">
              Siz tanlagan avtomobillar va mahsulotlar ro'yxati ({items.length}{' '}
              turdagi)
            </Text>
          </Box>
          <Button
            variant="subtle"
            color="red"
            size="sm"
            onClick={handleClearCartModal}
            leftSection={<IconTrash size={16} />}
          >
            Savatni tozalash
          </Button>
        </Group>

        <Grid gap="xl">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="md">
              {items.map(({ product, quantity }) => (
                <Card
                  key={product.id}
                  withBorder
                  padding="md"
                  radius="lg"
                  shadow="xs"
                >
                  <Group wrap="nowrap" align="center">
                    <Image
                      src={product.images?.[0]}
                      fallbackSrc="https://placehold.co/150x100?text=Rasm+yo'q"
                      w={120}
                      h={90}
                      radius="md"
                      alt={product.title}
                      style={{ objectFit: 'cover' }}
                    />

                    <Stack gap={4} style={{ flex: 1 }}>
                      <Text fw={700} size="lg" lineClamp={1}>
                        {product.title}
                      </Text>
                      {product.category?.name && (
                        <Badge
                          variant="light"
                          color="gray"
                          size="xs"
                          w="fit-content"
                        >
                          {product.category.name}
                        </Badge>
                      )}
                      <Text fw={800} size="md" c={redBg} mt={4}>
                        ${product.price}{' '}
                        <Text span size="xs" c="dimmed" fw={400}>
                          / dona
                        </Text>
                      </Text>
                    </Stack>

                    <Group gap="xs" wrap="nowrap" align="center">
                      <ActionIcon
                        variant="default"
                        size="md"
                        radius="md"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                      >
                        <IconMinus size={14} />
                      </ActionIcon>
                      <Text fw={700} size="sm" w={24} ta="center">
                        {quantity}
                      </Text>
                      <ActionIcon
                        variant="default"
                        size="md"
                        radius="md"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                      >
                        <IconPlus size={14} />
                      </ActionIcon>
                    </Group>

                    <Box ta="right" miw={90}>
                      <Text fw={800} size="lg" c={redBg}>
                        ${(product.price * quantity).toLocaleString()}
                      </Text>
                    </Box>

                    <ActionIcon
                      variant="subtle"
                      color="red"
                      size="lg"
                      onClick={() => handleRemove(product.id, product.title)}
                    >
                      <IconTrash size={18} />
                    </ActionIcon>
                  </Group>
                </Card>
              ))}
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card withBorder padding="xl" radius="xl" shadow="sm">
              <Title order={3} mb="lg">
                Buyurtma hisobi
              </Title>

              <Stack gap="sm">
                <Group justify="space-between">
                  <Text c="dimmed" size="sm">
                    Mahsulotlar soni:
                  </Text>
                  <Text fw={600} size="sm">
                    {items.reduce((acc, i) => acc + i.quantity, 0)} dona
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Text c="dimmed" size="sm">
                    Yetkazib berish:
                  </Text>
                  <Text fw={600} size="sm" c="green">
                    Bepul
                  </Text>
                </Group>

                <Divider my="sm" />

                <Group justify="space-between">
                  <Text fw={700} size="lg">
                    Jami summa:
                  </Text>
                  <Text fw={900} size="xl" c={redBg}>
                    ${totalPrice.toLocaleString()}
                  </Text>
                </Group>

                <Button
                  size="lg"
                  color="red"
                  radius="md"
                  mt="md"
                  fullWidth
                  onClick={() => setCheckoutOpened(true)}
                >
                  Buyurtma berish
                </Button>

                <Button
                  variant="light"
                  color="gray"
                  size="md"
                  radius="md"
                  fullWidth
                  onClick={() => navigate('/catalog')}
                >
                  Katalogga qaytish
                </Button>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  )
}
