import {
  Badge,
  Card,
  Group,
  Image,
  Text,
  Button,
  Modal,
  Stack,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import { Link } from 'react-router'
import { IconShoppingCart, IconCheck } from '@tabler/icons-react'
import type { IProduct } from '../model/types'
import { useDeleteProduct } from '../model/useProducts'
import { useAuthStore } from '@/entities/user'
import { useCartStore } from '@/entities/cart'
import { CreateProduct } from '@/features/manage-product'

export const ProductCard = ({ product }: { product: IProduct }) => {
  const [editOpened, setEditOpened] = useState(false)
  const deleteMutation = useDeleteProduct()
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.role === 'admin'
  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    addToCart(product)
    notifications.show({
      title: "Savatga qo'shildi!",
      message: `${product.title} savatingizga muvaffaqiyatli qo'shildi`,
      color: 'green',
      icon: <IconCheck size={18} />,
    })
  }

  const handleDelete = () => {
    deleteMutation.mutate(Number(product.id), {
      onSuccess: () => {
        notifications.show({
          title: 'Muvaffaqiyatli!',
          message: 'Mahsulot ochirildi',
          color: 'green',
        })
      },
      onError: () => {
        notifications.show({
          title: 'Xatolik!',
          message: "Mahsulotni o'chirishda xatolik yuz berdi",
          color: 'red',
        })
      },
    })
  }

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "O'chirishni tasdiqlang",
      centered: true,
      children: (
        <Text size="sm">
          Siz rostdan ham <b>{product.title}</b> mahsulotini ochirmoqchimisiz?
          Bu amalni ortga qaytarib bolmaydi.
        </Text>
      ),
      labels: { confirm: 'Ochirish', cancel: 'Bekor qilish' },
      confirmProps: { color: 'red' },
      onConfirm: handleDelete,
    })

  return (
    <>
      <Modal
        opened={editOpened}
        onClose={() => setEditOpened(false)}
        title="Mahsulotni tahrirlash"
      >
        <CreateProduct
          product={product}
          onSuccessCallback={() => setEditOpened(false)}
        />
      </Modal>

      <Card
        shadow="md"
        padding="lg"
        radius="xl"
        style={{
          border: '1px solid #e9ecef',
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          height: '100%',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <Stack gap="md" style={{ flex: 1 }}>
          <Card.Section pos="relative">
            <Link to={`/product/${product.id}`}>
              <Image
                src={product.images?.[0]}
                h={220}
                alt={product.title}
                fallbackSrc="https://placehold.co/600x400?text=Rasm+yo'q"
                style={{ objectFit: 'cover' }}
              />
            </Link>
            <Badge
              color="anor"
              variant="filled"
              size="xl"
              radius="md"
              pos="absolute"
              bottom={16}
              left={16}
              style={{
                fontWeight: 800,
                boxShadow: '0 4px 12px rgba(217,0,8,0.4)',
                letterSpacing: '0.5px',
              }}
            >
              ${product.price}
            </Badge>
            {isAdmin && (
              <Group gap="xs" pos="absolute" top={12} right={12}>
                <Button
                  color="anor"
                  variant="white"
                  radius="xl"
                  size="xs"
                  onClick={() => setEditOpened(true)}
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                >
                  Tahrirlash
                </Button>
                <Button
                  color="red"
                  variant="white"
                  radius="xl"
                  size="xs"
                  onClick={openDeleteModal}
                  loading={deleteMutation.isPending}
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                >
                  O'chirish
                </Button>
              </Group>
            )}
          </Card.Section>

          <Group justify="space-between" align="flex-start">
            <Text
              component={Link}
              to={`/product/${product.id}`}
              fw={800}
              size="lg"
              lineClamp={2}
              style={{
                flex: 1,
                lineHeight: 1.3,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {product.title}
            </Text>
          </Group>

          <Text size="sm" c="dimmed" lineClamp={2}>
            {product.description}
          </Text>
        </Stack>

        <Group gap="xs" mt="lg">
          <Button
            component={Link}
            to={`/product/${product.id}`}
            variant="default"
            radius="md"
            style={{ flex: 1 }}
            size="sm"
          >
            Batafsil
          </Button>
          <Button
            color="red"
            radius="md"
            onClick={handleAddToCart}
            style={{ flex: 1 }}
            size="sm"
            leftSection={<IconShoppingCart size={16} />}
          >
            Savatga
          </Button>
        </Group>
      </Card>
    </>
  )
}
