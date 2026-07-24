import React, { useEffect } from 'react'
import {
  Modal,
  TextInput,
  NumberInput,
  Textarea,
  Select,
  Button,
  Stack,
  Group,
  Image,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import type { IProduct } from '@/types/product'
import { useCategoriesQuery } from '@/hooks/useCategories'
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '@/hooks/useProducts'
import { notifications } from '@mantine/notifications'

interface ProductModalProps {
  opened: boolean
  onClose: () => void
  productToEdit: IProduct | null
}

export const ProductModal: React.FC<ProductModalProps> = ({
  opened,
  onClose,
  productToEdit,
}) => {
  const isEditing = !!productToEdit
  const { data: categories = [] } = useCategoriesQuery()

  const createMutation = useCreateProductMutation()
  const updateMutation = useUpdateProductMutation()

  const form = useForm({
    initialValues: {
      title: '',
      price: 10,
      description: '',
      categoryId: '',
      image: '',
    },
    validate: {
      title: (val) => (val.trim().length >= 2 ? null : 'Минимум 2 символа'),
      price: (val) => (val > 0 ? null : 'Цена должна быть больше 0'),
      description: (val) =>
        val.trim().length >= 3 ? null : 'Минимум 3 символа в описании',
      categoryId: (val) => (val ? null : 'Выберите категорию'),
      image: (val) =>
        /^(https?:\/\/).+/.test(val)
          ? null
          : 'Введите корректную ссылку (http/https)',
    },
  })

  useEffect(() => {
    if (productToEdit) {
      form.setValues({
        title: productToEdit.title,
        price: productToEdit.price,
        description: productToEdit.description || '',
        categoryId: String(productToEdit.category?.id || ''),
        image: productToEdit.images?.[0] || '',
      })
    } else {
      form.reset()
      if (categories.length > 0) {
        form.setFieldValue('categoryId', String(categories[0].id))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productToEdit, opened])

  const categoryOptions = categories.map((cat) => ({
    value: String(cat.id),
    label: cat.name,
  }))

  const handleSubmit = form.onSubmit((values) => {
    const payload = {
      title: values.title,
      price: Number(values.price),
      description: values.description,
      categoryId: Number(values.categoryId),
      images: [values.image],
    }

    if (isEditing && productToEdit) {
      updateMutation.mutate(
        { id: productToEdit.id, dto: payload },
        {
          onSuccess: () => {
            notifications.show({
              title: 'Успешно!',
              message: 'Товар обновлен',
              color: 'green',
            })
            onClose()
            form.reset()
          },
          onError: (err) => {
            notifications.show({
              title: 'Ошибка',
              message:
                err?.response?.data?.message || 'Не удалось обновить товар',
              color: 'red',
            })
          },
        }
      )
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          notifications.show({
            title: 'Успешно!',
            message: 'Новый товар создан и отображен',
            color: 'green',
          })
          onClose()
          form.reset()
        },
        onError: (err) => {
          notifications.show({
            title: 'Ошибка',
            message: err?.response?.data?.message || 'Не удалось создать товар',
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
      title={isEditing ? 'Редактировать товар' : 'Создать товар'}
      centered
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="sm">
          <TextInput
            label="Название товара"
            placeholder="Смартфон"
            required
            {...form.getInputProps('title')}
          />

          <Group grow>
            <NumberInput
              label="Цена ($)"
              placeholder="100"
              min={1}
              required
              {...form.getInputProps('price')}
            />

            <Select
              label="Категория"
              placeholder="Выберите категорию"
              data={categoryOptions}
              required
              {...form.getInputProps('categoryId')}
            />
          </Group>

          <Textarea
            label="Описание"
            placeholder="Описание товара..."
            minRows={3}
            required
            {...form.getInputProps('description')}
          />

          <TextInput
            label="Ссылка на фото"
            placeholder="https://picsum.photos/600"
            required
            {...form.getInputProps('image')}
          />

          {form.values.image && (
            <Group justify="center" mt="xs">
              <Image
                src={form.values.image}
                alt="Превью"
                h={120}
                w="auto"
                fit="contain"
                fallbackSrc="https://placehold.co/120x120?text=No+Image"
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
