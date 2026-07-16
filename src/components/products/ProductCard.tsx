import {
  Badge,
  Card,
  Group,
  Image,
  Text,
  ActionIcon,
  Modal,
} from '@mantine/core'
import { IconTrash, IconEdit } from '@tabler/icons-react'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import type { IProduct } from '../../types/product'
import { useDeleteProduct } from '../../hooks/useProducts'
import { CreateProduct } from './CreateProduct'

export const ProductCard = ({ product }: { product: IProduct }) => {
  const [editOpened, setEditOpened] = useState(false)
  const deleteMutation = useDeleteProduct()

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

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section pos="relative">
          <Image
            src={product.images?.[0]}
            h={180}
            alt={product.title}
            fallbackSrc="https://placehold.co/600x400?text=No+image"
          />
          <Group gap="xs" pos="absolute" top={10} right={10}>
            <ActionIcon
              color="blue"
              variant="filled"
              radius="md"
              onClick={() => setEditOpened(true)}
            >
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              color="red"
              variant="filled"
              radius="md"
              onClick={openDeleteModal}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        </Card.Section>

        <Group justify="space-between" mt="md">
          <Text fw={600} lineClamp={1} style={{ flex: 1 }}>
            {product.title}
          </Text>
          <Badge color="orange">${product.price}</Badge>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={2} mt="xs">
          {product.description}
        </Text>
      </Card>
    </>
  )
}
