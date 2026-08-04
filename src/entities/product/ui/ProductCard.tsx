import { Badge, Card, Group, Image, Text, Button, Modal } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import type { IProduct } from '../model/types'
import { useDeleteProduct } from '../model/useProducts'
import { useAuthStore } from '@/entities/user'
import { CreateProduct } from '@/features/manage-product'

export const ProductCard = ({ product }: { product: IProduct }) => {
  const [editOpened, setEditOpened] = useState(false)
  const deleteMutation = useDeleteProduct()
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.role === 'admin'

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
            h={240}
            alt={product.title}
            fallbackSrc="https://placehold.co/600x400?text=No+image"
          />
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

        <Group justify="space-between" mt="xl" align="flex-start">
          <Text
            fw={800}
            size="xl"
            lineClamp={2}
            style={{ flex: 1, lineHeight: 1.3 }}
          >
            {product.title}
          </Text>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={3} mt="sm">
          {product.description}
        </Text>
      </Card>
    </>
  )
}
