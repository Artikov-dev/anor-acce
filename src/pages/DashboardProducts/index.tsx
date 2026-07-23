import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import {
  Title,
  Button,
  Table,
  Group,
  ActionIcon,
  Image,
  Text,
  Paper,
  Stack,
  Skeleton,
  Alert,
  TextInput,
  Select,
  Pagination,
  Modal,
  Badge,
} from '@mantine/core'
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconAlertCircle,
  IconShoppingBag,
  IconFilterOff,
} from '@tabler/icons-react'
import {
  useProductsQuery,
  useDeleteProductMutation,
  usePrefetchProduct,
} from '@/hooks/useProducts'
import { useCategoriesQuery } from '@/hooks/useCategories'
import { ProductModal } from '@/components/ProductModal/ProductModal'
import type { IProduct } from '@/types/product'
import { notifications } from '@mantine/notifications'
import type { AxiosError } from 'axios'

const PAGE_SIZE = 10

export const DashboardProducts: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // Extract filters from URL search parameters
  const search = searchParams.get('search') || ''
  const categoryIdParam = searchParams.get('category') || ''
  const pageParam = parseInt(searchParams.get('page') || '1', 10)
  const sortByParam =
    (searchParams.get('sortBy') as 'price_asc' | 'price_desc' | 'default') ||
    'default'

  // Debounced search input local state for smooth typing
  const [searchInput, setSearchInput] = useState(search)

  // Fetch categories for filter dropdown
  const { data: categories = [] } = useCategoriesQuery()

  // Query parameters object for TanStack Query
  const queryParams = useMemo(() => {
    return {
      title: search || undefined,
      categoryId: categoryIdParam ? Number(categoryIdParam) : undefined,
      offset: (pageParam - 1) * PAGE_SIZE,
      limit: PAGE_SIZE,
      sortBy: sortByParam,
    }
  }, [search, categoryIdParam, pageParam, sortByParam])

  // Fetch products with reactive queryKey [products, queryParams]
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useProductsQuery(queryParams)

  // Hover prefetching helper
  const prefetchProduct = usePrefetchProduct()

  // Optimistic deletion mutation
  const deleteMutation = useDeleteProductMutation()

  // Modals state
  const [productModalOpened, setProductModalOpened] = useState(false)
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null)

  const [deleteModalOpened, setDeleteModalOpened] = useState(false)
  const [deletingProduct, setDeletingProduct] = useState<IProduct | null>(null)

  // Helper to update URL params
  const updateUrlParams = (newParams: Record<string, string | null>) => {
    const updated = new URLSearchParams(searchParams)
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === null || val === '' || val === 'default') {
        updated.delete(key)
      } else {
        updated.set(key, val)
      }
    })
    setSearchParams(updated)
  }

  const handleSearchChange = (val: string) => {
    setSearchInput(val)
    updateUrlParams({ search: val, page: '1' })
  }

  const handleCategoryChange = (val: string | null) => {
    updateUrlParams({ category: val, page: '1' })
  }

  const handleSortChange = (val: string | null) => {
    updateUrlParams({ sortBy: val, page: '1' })
  }

  const handlePageChange = (page: number) => {
    updateUrlParams({ page: String(page) })
  }

  const handleClearFilters = () => {
    setSearchInput('')
    setSearchParams(new URLSearchParams())
  }

  const handleOpenCreate = () => {
    setEditingProduct(null)
    setProductModalOpened(true)
  }

  const handleOpenEdit = (product: IProduct) => {
    setEditingProduct(product)
    setProductModalOpened(true)
  }

  const handleOpenDelete = (product: IProduct) => {
    setDeletingProduct(product)
    setDeleteModalOpened(true)
  }

  const handleConfirmDelete = () => {
    if (!deletingProduct) return
    const prodToDelete = deletingProduct
    setDeleteModalOpened(false)
    setDeletingProduct(null)

    deleteMutation.mutate(prodToDelete.id, {
      onSuccess: () => {
        notifications.show({
          title: 'Удалено',
          message: `Товар "${prodToDelete.title}" успешно удален`,
          color: 'green',
        })
      },
      onError: (err: AxiosError<{ message?: string }>) => {
        notifications.show({
          title: 'Ошибка отката',
          message:
            err?.response?.data?.message ||
            'Не удалось удалить товар. Изменения отменены.',
          color: 'red',
        })
      },
    })
  }

  const categoryOptions = [
    { value: '', label: 'Все категории' },
    ...categories.map((c) => ({ value: String(c.id), label: c.name })),
  ]

  const sortOptions = [
    { value: 'default', label: 'По умолчанию' },
    { value: 'price_asc', label: 'Сначала дешевые ($ ↑)' },
    { value: 'price_desc', label: 'Сначала дорогие ($ ↓)' },
  ]

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>Товары</Title>
          <Text c="dimmed" size="sm">
            Управление каталогом товаров магазина
          </Text>
        </div>
        <Button leftSection={<IconPlus size={16} />} onClick={handleOpenCreate}>
          Добавить товар
        </Button>
      </Group>

      {/* Filters and Controls */}
      <Paper p="sm" withBorder radius="md">
        <Group grow align="flex-end">
          <TextInput
            label="Поиск по названию"
            placeholder="Введите название..."
            leftSection={<IconSearch size={16} />}
            value={searchInput}
            onChange={(e) => handleSearchChange(e.currentTarget.value)}
          />

          <Select
            label="Фильтр по категории"
            placeholder="Выберите категорию"
            data={categoryOptions}
            value={categoryIdParam}
            onChange={handleCategoryChange}
            clearable
          />

          <Select
            label="Сортировка по цене"
            placeholder="По умолчанию"
            data={sortOptions}
            value={sortByParam}
            onChange={handleSortChange}
          />

          {(search || categoryIdParam || sortByParam !== 'default') && (
            <Button
              variant="light"
              color="gray"
              leftSection={<IconFilterOff size={16} />}
              onClick={handleClearFilters}
            >
              Сбросить
            </Button>
          )}
        </Group>
      </Paper>

      {/* State 1: Loading */}
      {isLoading && (
        <Paper p="md" withBorder radius="md">
          <Stack gap="sm">
            <Skeleton height={45} />
            <Skeleton height={45} />
            <Skeleton height={45} />
            <Skeleton height={45} />
            <Skeleton height={45} />
          </Stack>
        </Paper>
      )}

      {/* State 2: Error */}
      {isError && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Ошибка загрузки данных"
          color="red"
          variant="filled"
        >
          <Group justify="space-between" align="center">
            <Text size="sm">
              Не удалось загрузить список товаров. Проверьте соединение.
            </Text>
            <Button
              variant="white"
              color="red"
              size="xs"
              onClick={() => refetch()}
            >
              Повторить
            </Button>
          </Group>
        </Alert>
      )}

      {/* State 3: Content / Empty */}
      {!isLoading &&
        !isError &&
        (products.length === 0 ? (
          <Paper p="xl" withBorder style={{ textAlign: 'center' }} radius="md">
            <Stack align="center" gap="xs">
              <IconShoppingBag size={48} color="gray" />
              <Text fw={500} size="lg">
                Товары не найдены
              </Text>
              <Text c="dimmed" size="sm">
                Попробуйте изменить параметры поиска или добавьте новый товар.
              </Text>
              <Group mt="sm">
                <Button variant="default" onClick={handleClearFilters}>
                  Сбросить фильтры
                </Button>
                <Button
                  leftSection={<IconPlus size={16} />}
                  onClick={handleOpenCreate}
                >
                  Создать товар
                </Button>
              </Group>
            </Stack>
          </Paper>
        ) : (
          <>
            <Paper withBorder radius="md">
              <Table highlightOnHover align="left">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th style={{ width: 70 }}>Фото</Table.Th>
                    <Table.Th>Название</Table.Th>
                    <Table.Th>Категория</Table.Th>
                    <Table.Th style={{ width: 110 }}>Цена</Table.Th>
                    <Table.Th style={{ width: 120, textAlign: 'right' }}>
                      Действия
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {products.map((product) => (
                    <Table.Tr
                      key={product.id}
                      // REQUIREMENT: prefetchQuery on row hover
                      onMouseEnter={() => prefetchProduct(product.id)}
                    >
                      <Table.Td>
                        <Image
                          src={product.images?.[0]}
                          alt={product.title}
                          h={45}
                          w={45}
                          radius="md"
                          fallbackSrc="https://placehold.co/45x45?text=No+Img"
                        />
                      </Table.Td>
                      <Table.Td fw={500}>
                        <Text size="sm" lineClamp={2}>
                          {product.title}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" color="blue">
                          {product.category?.name || 'Без категории'}
                        </Badge>
                      </Table.Td>
                      <Table.Td fw={700} c="green.7">
                        ${product.price}
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs" justify="flex-end">
                          <ActionIcon
                            variant="subtle"
                            color="blue"
                            onClick={() => handleOpenEdit(product)}
                            title="Редактировать"
                          >
                            <IconEdit size={18} />
                          </ActionIcon>
                          <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={() => handleOpenDelete(product)}
                            title="Удалить"
                            loading={
                              deleteMutation.isPending &&
                              deletingProduct?.id === product.id
                            }
                          >
                            <IconTrash size={18} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Paper>

            {/* Pagination Controls */}
            <Group justify="space-between" align="center" mt="sm">
              <Text size="sm" c="dimmed">
                Показано товаров: {products.length}
              </Text>
              <Pagination
                total={
                  products.length < PAGE_SIZE && pageParam === 1
                    ? 1
                    : pageParam + (products.length === PAGE_SIZE ? 1 : 0)
                }
                value={pageParam}
                onChange={handlePageChange}
              />
            </Group>
          </>
        ))}

      {/* Modal for Create & Edit */}
      <ProductModal
        opened={productModalOpened}
        onClose={() => setProductModalOpened(false)}
        productToEdit={editingProduct}
      />

      {/* Confirmation Modal for Delete */}
      <Modal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        title="Подтверждение удаления"
        centered
      >
        <Stack>
          <Text size="sm">
            Вы уверены, что хотите удалить товар{' '}
            <b>"{deletingProduct?.title}"</b>? Это действие мгновенно скроет
            товар из списка.
          </Text>
          <Group justify="flex-end" mt="md">
            <Button
              variant="default"
              onClick={() => setDeleteModalOpened(false)}
            >
              Отмена
            </Button>
            <Button color="red" onClick={handleConfirmDelete}>
              Удалить
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  )
}
