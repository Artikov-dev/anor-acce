import {
  Container,
  Title,
  Grid,
  Text,
  Box,
  Image,
  Button,
  Group,
  Badge,
  Loader,
  Center,
  Stack,
} from '@mantine/core'
import { useParams, useNavigate } from 'react-router'
import { IconShoppingCart, IconCheck, IconArrowLeft } from '@tabler/icons-react'
import { useProductById } from '@/entities/product'
import { useCartStore } from '@/entities/cart'
import { notifications } from '@mantine/notifications'

export const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const addToCart = useCartStore((state) => state.addToCart)

  const {
    data: product,
    isLoading,
    isError,
  } = useProductById(id ? Number(id) : null)

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product)
    notifications.show({
      title: "Savatga qo'shildi!",
      message: `${product.title} savatga muvaffaqiyatli qo'shildi`,
      color: 'green',
      icon: <IconCheck size={18} />,
    })
  }

  const handleBuyNow = () => {
    if (!product) return
    addToCart(product)
    navigate('/cart')
  }

  if (isLoading) {
    return (
      <Center h={400}>
        <Loader color="red" />
      </Center>
    )
  }

  if (isError || !product) {
    return (
      <Center h={400}>
        <Stack align="center" gap="md">
          <Text c="red" fw={700} size="lg">
            Mahsulot topilmadi
          </Text>
          <Button
            variant="light"
            color="red"
            onClick={() => navigate('/catalog')}
            leftSection={<IconArrowLeft size={18} />}
          >
            Katalogga qaytish
          </Button>
        </Stack>
      </Center>
    )
  }

  return (
    <Container size="lg" py={60}>
      <Button
        variant="light"
        color="red"
        onClick={() => navigate('/catalog')}
        mb="xl"
        leftSection={<IconArrowLeft size={18} />}
      >
        Katalogga qaytish
      </Button>

      <Grid gap={40} align="flex-start">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Image
            src={product.images?.[0]}
            fallbackSrc="https://placehold.co/600x400?text=Rasm+yo'q"
            radius="lg"
            alt={product.title}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Box>
            <Group justify="space-between" align="flex-start" mb="xs">
              <Title order={1} size={32} fw={800}>
                {product.title}
              </Title>
              <Badge color="red" size="xl" radius="md">
                ${product.price}
              </Badge>
            </Group>

            {product.category?.name && (
              <Badge color="gray" variant="light" size="md" mb="lg">
                {product.category.name}
              </Badge>
            )}

            <Text size="md" c="dimmed" mb="xl" style={{ lineHeight: 1.6 }}>
              {product.description}
            </Text>

            <Group gap="md">
              <Button
                color="red"
                size="lg"
                radius="md"
                style={{ flex: 1 }}
                onClick={handleAddToCart}
                leftSection={<IconShoppingCart size={20} />}
              >
                Savatga qo'shish
              </Button>
              <Button
                variant="outline"
                color="red"
                size="lg"
                radius="md"
                style={{ flex: 1 }}
                onClick={handleBuyNow}
              >
                Hozir xarid qilish
              </Button>
            </Group>
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  )
}
