import React, { useEffect } from 'react'
import { Modal, TextInput, Button, Stack, Group, Image } from '@mantine/core'
import { useForm } from '@mantine/form'
import type { ICategory } from '@/types/category'
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '@/hooks/useCategories'
import { notifications } from '@mantine/notifications'

interface CategoryModalProps {
  opened: boolean
  onClose: () => void
  categoryToEdit: ICategory | null
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  opened,
  onClose,
  categoryToEdit,
}) => {
  const isEditing = !!categoryToEdit
  const createMutation = useCreateCategoryMutation()
  const updateMutation = useUpdateCategoryMutation()

  const form = useForm({
    initialValues: {
      name: '',
      image: '',
    },
    validate: {
      name: (val) => (val.trim().length >= 2 ? null : 'Минимум 2 символа'),
      image: (val) =>
        /^(https?:\/\/).+/.test(val)
          ? null
          : 'Введите корректную ссылку на изображение (http/https)',
    },
  })

  useEffect(() => {
    if (categoryToEdit) {
      form.setValues({
        name: categoryToEdit.name,
        image: categoryToEdit.image,
      })
    } else {
      form.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryToEdit, opened])

  const handleSubmit = form.onSubmit((values) => {
    if (isEditing && categoryToEdit) {
      updateMutation.mutate(
        { id: categoryToEdit.id, dto: values },
        {
          onSuccess: () => {
            notifications.show({
              title: 'Успешно!',
              message: 'Категория обновлена',
              color: 'green',
            })
            onClose()
            form.reset()
          },
          onError: (err) => {
            notifications.show({
              title: 'Ошибка',
              message:
                err?.response?.data?.message || 'Не удалось обновить категорию',
              color: 'red',
            })
          },
        }
      )
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          notifications.show({
            title: 'Успешно!',
            message: 'Категория создана',
            color: 'green',
          })
          onClose()
          form.reset()
        },
        onError: (err) => {
          notifications.show({
            title: 'Ошибка',
            message:
              err?.response?.data?.message || 'Не удалось создать категорию',
            color: 'red',
          })
        },
      })
    }
  })

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditing ? 'Редактировать категорию' : 'Создать категорию'}
      centered
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Название категории"
            placeholder="Электроника"
            required
            {...form.getInputProps('name')}
          />

          <TextInput
            label="Ссылка на изображение"
            placeholder="https://picsum.photos/400"
            required
            {...form.getInputProps('image')}
          />

          {form.values.image && (
            <Group justify="center" mt="xs">
              <Image
                src={form.values.image}
                alt="Превью"
                h={100}
                w="auto"
                fit="contain"
                fallbackSrc="https://placehold.co/100x100?text=No+Image"
                radius="md"
              />
            </Group>
          )}

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={onClose} disabled={isPending}>
              Отмена
            </Button>
            <Button type="submit" loading={isPending}>
              {isEditing ? 'Сохранить' : 'Создать'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
