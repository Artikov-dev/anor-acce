import React from 'react'
import {
  Title,
  Text,
  SimpleGrid,
  Paper,
  Group,
  Stack,
  Skeleton,
  Alert,
  Button,
} from '@mantine/core'
import { useProductsQuery } from '@/entities/product'
import { useCategoriesQuery } from '@/entities/category'
import { useNavigate } from 'react-router'

export const DashboardHome: React.FC = () => {
  const navigate = useNavigate()
  const {
    data: products = [],
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    refetch: refetchProducts,
  } = useProductsQuery({ limit: 100 })

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    refetch: refetchCategories,
  } = useCategoriesQuery()

  const isLoading = isLoadingProducts || isLoadingCategories
  const isError = isErrorProducts || isErrorCategories

  const totalProducts = products.length
  const totalCategories = categories.length

  const averagePrice =
    totalProducts > 0
      ? (products.reduce((acc, p) => acc + p.price, 0) / totalProducts).toFixed(
          2
        )
      : '0.00'

  const stats = [
    {
      title: 'Jami mahsulotlar',
      value: totalProducts.toString(),
      color: 'blue',
      link: '/dashboard/products',
    },
    {
      title: 'Jami kategoriyalar',
      value: totalCategories.toString(),
      color: 'teal',
      link: '/dashboard/categories',
    },
    {
      title: "O'rtacha mahsulot narxi",
      value: `$${averagePrice}`,
      color: 'violet',
      link: '/dashboard/products',
    },
  ]

  return (
    <Stack gap="lg">
      <div>
        <Title order={2}>Admin Boshqaruv Paneli</Title>
        <Text c="dimmed" size="sm">
          Do'konning umumiy analitikasi va ko'rsatkichlari
        </Text>
      </div>

      {isLoading ? (
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          <Skeleton height={120} radius="md" />
          <Skeleton height={120} radius="md" />
          <Skeleton height={120} radius="md" />
        </SimpleGrid>
      ) : isError ? (
        <Alert
          title="Analitikani yuklashda xatolik"
          color="red"
          variant="filled"
        >
          <Group justify="space-between" align="center">
            <Text size="sm">
              Boshqaruv paneli ma'lumotlarini yuklab bo'lmadi.
            </Text>
            <Button
              variant="white"
              color="red"
              size="xs"
              onClick={() => {
                refetchProducts()
                refetchCategories()
              }}
            >
              Qayta urinish
            </Button>
          </Group>
        </Alert>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          {stats.map((stat) => (
            <Paper
              key={stat.title}
              withBorder
              p="md"
              radius="md"
              style={{
                cursor: 'pointer',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onClick={() => navigate(stat.link)}
            >
              <Group justify="space-between" align="flex-start">
                <Stack gap={4}>
                  <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                    {stat.title}
                  </Text>
                  <Title order={2} fw={800}>
                    {stat.value}
                  </Title>
                </Stack>
              </Group>

              <Group gap={4} mt="md" align="center">
                <Text size="xs" c="red" fw={600}>
                  Bo'limga o'tish &rarr;
                </Text>
              </Group>
            </Paper>
          ))}
        </SimpleGrid>
      )}
    </Stack>
  )
}
