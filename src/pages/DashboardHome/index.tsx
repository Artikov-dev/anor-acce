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
  ThemeIcon,
  Button,
} from '@mantine/core'
import {
  IconShoppingBag,
  IconCategory,
  IconCurrencyDollar,
  IconAlertCircle,
  IconArrowUpRight,
} from '@tabler/icons-react'
import { useProductsQuery } from '@/hooks/useProducts'
import { useCategoriesQuery } from '@/hooks/useCategories'
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
      title: 'Всего товаров',
      value: totalProducts.toString(),
      icon: IconShoppingBag,
      color: 'blue',
      link: '/dashboard/products',
    },
    {
      title: 'Всего категорий',
      value: totalCategories.toString(),
      icon: IconCategory,
      color: 'teal',
      link: '/dashboard/categories',
    },
    {
      title: 'Средняя цена товара',
      value: `$${averagePrice}`,
      icon: IconCurrencyDollar,
      color: 'violet',
      link: '/dashboard/products',
    },
  ]

  return (
    <Stack gap="lg">
      <div>
        <Title order={2}>Главная панель дашборда</Title>
        <Text c="dimmed" size="sm">
          Общая аналитика и основные показатели магазина
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
          icon={<IconAlertCircle size={16} />}
          title="Ошибка загрузки аналитики"
          color="red"
          variant="filled"
        >
          <Group justify="space-between" align="center">
            <Text size="sm">Не удалось загрузить данные дашборда.</Text>
            <Button
              variant="white"
              color="red"
              size="xs"
              onClick={() => {
                refetchProducts()
                refetchCategories()
              }}
            >
              Повторить
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
                <ThemeIcon
                  size={48}
                  radius="md"
                  color={stat.color}
                  variant="light"
                >
                  <stat.icon size={26} />
                </ThemeIcon>
              </Group>

              <Group gap={4} mt="md" align="center">
                <Text size="xs" c="blue" fw={500}>
                  Перейти в раздел
                </Text>
                <IconArrowUpRight size={14} color="#228be6" />
              </Group>
            </Paper>
          ))}
        </SimpleGrid>
      )}
    </Stack>
  )
}
