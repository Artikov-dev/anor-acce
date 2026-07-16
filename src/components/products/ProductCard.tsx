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

      <Card
        shadow="md"
        padding="lg"
        radius="xl"
        style={{
          border: '1px solid var(--border)',
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = 'var(--shadow)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <Card.Section pos="relative">
          <Image
            src={product.images?.[0]}
            h={220}
            alt={product.title}
            fallbackSrc="https://placehold.co/600x400?text=No+image"
          />
          <Group gap="xs" pos="absolute" top={12} right={12}>
            <ActionIcon
              color="anor"
              variant="white"
              radius="xl"
              size="lg"
              onClick={() => setEditOpened(true)}
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              color="red"
              variant="white"
              radius="xl"
              size="lg"
              onClick={openDeleteModal}
              loading={deleteMutation.isPending}
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
              <IconTrash size={18} color="#d90008" />
            </ActionIcon>
          </Group>
        </Card.Section>

        <Group justify="space-between" mt="md" align="flex-start">
          <Text
            fw={700}
            size="lg"
            lineClamp={2}
            style={{ flex: 1, color: 'var(--text-h)' }}
          >
            {product.title}
          </Text>
          <Badge
            color="anor"
            variant="filled"
            size="lg"
            radius="sm"
            style={{ fontWeight: 800 }}
          >
            ${product.price}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={3} mt="sm">
          {product.description}
        </Text>
      </Card>
    </>
  )
}
