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
import {
  ProductCard,
  useProducts,
  type IProduct,
  type TProductParams,
} from '@/entities/product'
import { ProductFilter } from '@/features/filter-products'
import { CreateProduct } from '@/features/manage-product'
import { useSearchRequestParams } from '@/shared/lib/hooks/useSearchRequestParams'
import { useAuthStore } from '@/entities/user'

const PAGE_SIZE = 6

export function ProductsPage() {
  const [opened, setOpened] = useState(false)
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.role === 'admin'

  const { getDefaultSearchParams, setSearchParams } =
    useSearchRequestParams<TProductParams>({
      defaultParams: { page: '1', size: String(PAGE_SIZE) },
    })

  const params = getDefaultSearchParams()

  const { data, isLoading, isError, error } = useProducts(params)

  const products = Array.isArray(data) ? data : []
  const totalPages = Math.ceil((products.length || 0) / PAGE_SIZE)

  return (
    <Container size="xl" py="xl">
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Yangi mahsulot qo'shish"
      >
        <CreateProduct onSuccessCallback={() => setOpened(false)} />
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
            <Button onClick={() => setOpened(true)} color="red" radius="md">
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
                <ProductCard key={product.id} product={product} />
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
