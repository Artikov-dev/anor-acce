import {
  Alert,
  Box,
  Center,
  Loader,
  SimpleGrid,
  Text,
  Title,
  Container,
} from '@mantine/core'
import { ProductCard } from '../components/products/ProductCard.tsx'
import { useProducts } from '../hooks/useProducts.ts'

export function ProductsPage() {
  const { data, isLoading, isError, error } = useProducts({ size: '20' })

  const products = data?.data ?? []

  return (
    <Container size="xl" py="xl">
      <Title order={2} mb="xl" ta="center">
        Каталог
      </Title>

      <Box mt="xl">
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
    </Container>
  )
}
