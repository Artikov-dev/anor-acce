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
} from '@mantine/core'
import { ProductCard } from '../components/products/ProductCard'
import { ProductFilter } from '../components/products/ProductFilter'
import { useProducts } from '../hooks/useProducts'
import { useSearchRequestParams } from '../hooks/useSearchRequestParams'
import type { TProductParams } from '../types/product'

const PAGE_SIZE = 6

export function ProductsPage() {
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
      <Stack gap={40} align="stretch">
        <Title order={2} ta="center">
          Каталог
        </Title>

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
