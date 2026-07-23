import React, { useState } from 'react'
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
  Modal,
} from '@mantine/core'
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconAlertCircle,
  IconCategory,
} from '@tabler/icons-react'
import {
  useCategoriesQuery,
  useDeleteCategoryMutation,
} from '@/hooks/useCategories'
import { CategoryModal } from '@/components/CategoryModal/CategoryModal'
import type { ICategory } from '@/types/category'
import { notifications } from '@mantine/notifications'
import type { AxiosError } from 'axios'

export const DashboardCategories: React.FC = () => {
  const { data: categories, isLoading, isError, refetch } = useCategoriesQuery()
  const deleteMutation = useDeleteCategoryMutation()

  const [modalOpened, setModalOpened] = useState(false)
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(null)

  const [deleteModalOpened, setDeleteModalOpened] = useState(false)
  const [deletingCategory, setDeletingCategory] = useState<ICategory | null>(
    null
  )

  const handleOpenCreate = () => {
    setEditingCategory(null)
    setModalOpened(true)
  }

  const handleOpenEdit = (category: ICategory) => {
    setEditingCategory(category)
    setModalOpened(true)
  }

  const handleOpenDelete = (category: ICategory) => {
    setDeletingCategory(category)
    setDeleteModalOpened(true)
  }

  const ConfirmDelete = () => {
    if (!deletingCategory) return
    deleteMutation.mutate(deletingCategory.id, {
      onSuccess: () => {
        notifications.show({
          title: 'Удалено',
          message: `Категория "${deletingCategory.name}" успешно удалена`,
          color: 'green',
        })
        setDeleteModalOpened(false)
        setDeletingCategory(null)
      },
      onError: (err: AxiosError<{ message?: string }>) => {
        notifications.show({
          title: 'Ошибка',
          message:
            err.response?.data?.message || 'Не удалось удалить категорию',
          color: 'red',
        })
      },
    })
  }

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>Категории</Title>
          <Text c="dimmed" size="sm">
            Управление категориями товаров
          </Text>
        </div>
        <Button leftSection={<IconPlus size={16} />} onClick={handleOpenCreate}>
          Добавить категорию
        </Button>
      </Group>

      {/* State 1: Loading */}
      {isLoading && (
        <Paper p="md" withBorder>
          <Stack gap="sm">
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
          </Stack>
        </Paper>
      )}

      {/* State 2: Error */}
      {isError && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Ошибка загрузки"
          color="red"
          variant="filled"
        >
          <Group justify="space-between" align="center">
            <Text size="sm">Не удалось загрузить список категорий.</Text>
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
        categories &&
        (categories.length === 0 ? (
          <Paper p="xl" withBorder style={{ textAlign: 'center' }}>
            <Stack align="center" gap="xs">
              <IconCategory size={48} color="gray" />
              <Text fw={500} size="lg">
                Категории не найдены
              </Text>
              <Text c="dimmed" size="sm">
                Создайте первую категорию для каталога
              </Text>
              <Button
                leftSection={<IconPlus size={16} />}
                onClick={handleOpenCreate}
                mt="sm"
              >
                Создать категорию
              </Button>
            </Stack>
          </Paper>
        ) : (
          <Paper withBorder radius="md">
            <Table highlightOnHover align="left">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ width: 80 }}>Изображение</Table.Th>
                  <Table.Th>Название</Table.Th>
                  <Table.Th style={{ width: 120, textAlign: 'right' }}>
                    Действия
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {categories.map((cat) => (
                  <Table.Tr key={cat.id}>
                    <Table.Td>
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        h={40}
                        w={40}
                        radius="md"
                        fallbackSrc="https://placehold.co/40x40?text=No+Img"
                      />
                    </Table.Td>
                    <Table.Td fw={500}>{cat.name}</Table.Td>
                    <Table.Td>
                      <Group gap="xs" justify="flex-end">
                        <ActionIcon
                          variant="subtle"
                          color="blue"
                          onClick={() => handleOpenEdit(cat)}
                          title="Редактировать"
                        >
                          <IconEdit size={18} />
                        </ActionIcon>
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          onClick={() => handleOpenDelete(cat)}
                          title="Удалить"
                          loading={
                            deleteMutation.isPending &&
                            deletingCategory?.id === cat.id
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
        ))}

      {/* Modal for Create & Edit */}
      <CategoryModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        categoryToEdit={editingCategory}
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
            Вы уверены, что хотите удалить категорию{' '}
            <b>"{deletingCategory?.name}"</b>? Это действие нельзя отменить.
          </Text>
          <Group justify="flex-end" mt="md">
            <Button
              variant="default"
              onClick={() => setDeleteModalOpened(false)}
              disabled={deleteMutation.isPending}
            >
              Отмена
            </Button>
            <Button
              color="red"
              onClick={ConfirmDelete}
              loading={deleteMutation.isPending}
            >
              Удалить
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  )
}
