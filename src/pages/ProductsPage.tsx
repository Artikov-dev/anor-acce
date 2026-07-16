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
import { ProductCard } from '../components/products/ProductCard'
import { ProductFilter } from '../components/products/ProductFilter'
import { CreateProduct } from '../components/products/CreateProduct'
import { useProducts } from '../hooks/useProducts'
import { useSearchRequestParams } from '../hooks/useSearchRequestParams'
import type { TProductParams } from '../types/product'

const PAGE_SIZE = 6

export function ProductsPage() {
  const [opened, setOpened] = useState(false)

  const { getDefaultSearchParams, setSearchParams } =
    useSearchRequestParams<TProductParams>({
      defaultParams: { page: '1', size: String(PAGE_SIZE) },
    })

  const params = getDefaultSearchParams()

  const { data, isLoading, isError, error } = useProducts(params)

  const products = data?.data ?? []
  const totalPages = Math.ceil((data?.total ?? 0) / PAGE_SIZE)

  return (
    <Container size="xl" py="xl">
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Yangi mahsulot"
      >
        <CreateProduct onSuccessCallback={() => setOpened(false)} />
      </Modal>

      <Stack gap={40} align="stretch">
        <Group justify="space-between">
          <Title order={2}>Каталог</Title>
          <Button onClick={() => setOpened(true)} color="red">
            + Mahsulot qo'shish
          </Button>
        </Group>

        <ProductFilter />

        <Box>
          {isLoading ? (
            <Center h={200}>
              <Loader color="orange" />
            </Center>
          ) : isError ? (
            <Alert color="red" title="Не удалось загрузить товары">
              {error.message}
            </Alert>
          ) : products.length === 0 ? (
            <Center h={200}>
              <Text c="dimmed">Ничего не найдено</Text>
            </Center>
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </SimpleGrid>
          )}
        </Box>

        {totalPages > 1 && (
          <Center>
            <Pagination
              radius="xl"
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
