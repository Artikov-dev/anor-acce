import {
  Badge,
  Card,
  Group,
  Image,
  Text,
  ActionIcon,
  Modal,
  Button,
} from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import type { IProduct } from '../../types/product'
import { useDeleteProduct } from '../../hooks/useProducts'
import { notifications } from '@mantine/notifications'

export const ProductCard = ({ product }: { product: IProduct }) => {
  const [opened, setOpened] = useState(false)
  const deleteMutation = useDeleteProduct()

  const handleDelete = () => {
    deleteMutation.mutate(Number(product.id), {
      onSuccess: () => {
        notifications.show({
          title: 'Muvaffaqiyatli!',
          message: 'Mahsulot ochirildi',
          color: 'green',
        })
        setOpened(false)
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

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="O'chirishni tasdiqlang"
        centered
      >
        <Text size="sm" mb="lg">
          Siz rostdan ham <b>{product.title}</b> mahsulotini ochirmoqchimisiz?
          Bu amalni ortga qaytarib bolmaydi.
        </Text>
        <Group justify="flex-end">
          <Button variant="light" color="gray" onClick={() => setOpened(false)}>
            Bekor qilish
          </Button>
          <Button
            color="red"
            loading={deleteMutation.isPending}
            onClick={handleDelete}
          >
            Ochirish
          </Button>
        </Group>
      </Modal>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section pos="relative">
          <Image
            src={product.images?.[0]}
            h={180}
            alt={product.title}
            fallbackSrc="https://placehold.co/600x400?text=No+image"
          />
          <ActionIcon
            color="red"
            variant="filled"
            radius="md"
            pos="absolute"
            top={10}
            right={10}
            onClick={() => setOpened(true)}
          >
            <IconTrash size={18} />
          </ActionIcon>
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
