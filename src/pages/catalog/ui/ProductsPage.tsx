import { useState } from 'react'
import {
  Alert,
  Box,
  Center,
  Loader,
  Pagination,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Container,
  Button,
  Modal,
  Group,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import {
  ProductCard,
  useProducts,
  useDeleteProduct,
  type IProduct,
  type TProductParams,
} from '@/entities/product'
import { ProductFilter } from '@/features/filter-products'
import { CreateProduct } from '@/features/manage-product'
import { useAuthStore } from '@/entities/user'
import { useCartStore } from '@/entities/cart'
import { useSearchRequestParams } from '@/shared'

const PAGE_SIZE = 6

export function ProductsPage() {
  const [opened, setOpened] = useState(false)
  const [editingProduct, setEditingProduct] = useState<IProduct | undefined>(
    undefined
  )
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.role === 'admin'
  const addToCart = useCartStore((state) => state.addToCart)
  const deleteMutation = useDeleteProduct()

  const { getDefaultSearchParams, setSearchParams } =
    useSearchRequestParams<TProductParams>({
      defaultParams: { page: '1', size: String(PAGE_SIZE) },
    })

  const params = getDefaultSearchParams()

  const { data, isLoading, isError, error } = useProducts(params)

  const products = Array.isArray(data) ? data : []
  const totalPages = Math.ceil((products.length || 0) / PAGE_SIZE)

  const handleAddToCart = (product: IProduct) => {
    addToCart(product)
    notifications.show({
      title: "Savatga qo'shildi!",
      message: `${product.title} savatingizga muvaffaqiyatli qo'shildi`,
      color: 'green',
      icon: <IconCheck size={18} />,
    })
  }

  const handleEdit = (product: IProduct) => {
    setEditingProduct(product)
    setOpened(true)
  }

  const handleDelete = (product: IProduct) => {
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
      onConfirm: () => {
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
      },
    })
  }

  const handleCloseModal = () => {
    setEditingProduct(undefined)
    setOpened(false)
  }

  return (
    <Container size="xl" py="xl">
      <Modal
        opened={opened}
        onClose={handleCloseModal}
        title={
          editingProduct ? 'Mahsulotni tahrirlash' : "Yangi mahsulot qo'shish"
        }
      >
        <CreateProduct
          product={editingProduct}
          onSuccessCallback={handleCloseModal}
        />
      </Modal>

      <Stack gap={30} align="stretch">
        <Group justify="space-between" align="center">
          <Box>
            <Title order={1} size={32} fw={900}>
              Avtomobillar va Mahsulotlar Katalogi
            </Title>
            <Text c="dimmed" size="sm">
              O'zingizga mos bo'lgan eng yaxshi avtomobillarni tanlang va
              ijaraga oling
            </Text>
          </Box>
          {isAdmin && (
            <Button
              onClick={() => {
                setEditingProduct(undefined)
                setOpened(true)
              }}
              color="red"
              radius="md"
            >
              + Yangi mahsulot
            </Button>
          )}
        </Group>

        <ProductFilter />

        <Box mih={300}>
          {isLoading ? (
            <Center h={300}>
              <Loader color="red" size="lg" />
            </Center>
          ) : isError ? (
            <Alert
              color="red"
              title="Mahsulotlarni yuklashda xatolik yuz berdi"
            >
              {error?.message || "Iltimos, qaytadan urinib ko'ring."}
            </Alert>
          ) : products.length === 0 ? (
            <Center h={300}>
              <Text c="dimmed" size="lg">
                Hech qanday mahsulot topilmadi
              </Text>
            </Center>
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
              {products.map((product: IProduct) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAdmin={isAdmin}
                  onAddToCart={handleAddToCart}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </SimpleGrid>
          )}
        </Box>

        {totalPages > 1 && (
          <Center mt="xl">
            <Pagination
              radius="xl"
              color="red"
              total={totalPages}
              value={Number(params.page ?? 1)}
              onChange={(page) => setSearchParams({ key: 'page', value: page })}
            />
          </Center>
        )}
      </Stack>
    </Container>
  )
}
