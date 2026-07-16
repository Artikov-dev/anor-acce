import { useState } from 'react'
import {
  TextInput,
  NumberInput,
  Textarea,
  Button,
  Stack,
  Select,
  Group,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import {
  useCreateProduct,
  useUpdateProduct,
  useCategories,
} from '../../hooks/useProducts'
import type { ICategory, IProduct } from '../../types/product'

export const CreateProduct = ({
  onSuccessCallback,
  product,
}: {
  onSuccessCallback?: () => void
  product?: IProduct
}) => {
  const [loading, setLoading] = useState(false)
  const createMutation = useCreateProduct()
  const updateMutation = useUpdateProduct()
  const { data: categories = [] } = useCategories()

  const isEdit = !!product

  const form = useForm({
    initialValues: {
      title: product?.title || '',
      price: product?.price || 0,
      description: product?.description || '',
      categoryId: product?.category?.id ? String(product.category.id) : '',
      images: product?.images?.[0] || 'https://i.imgur.com/QkIa5tT.jpeg',
    },
    validate: {
      title: (value) =>
        value.length < 3 ? "Kamida 3 ta harf bo'lishi kerak" : null,
      price: (value) => (value <= 0 ? "Narx 0 dan katta bo'lishi kerak" : null),
      description: (value) => (value.length < 10 ? 'Batafsilroq yozing' : null),
      categoryId: (value) => (!value ? 'Kategoriyani tanlang' : null),
      images: (value) => (!value ? 'Rasm havolasini kiriting' : null),
    },
  })

  const handleSubmit = (values: typeof form.values) => {
    setLoading(true)
    const payload = {
      title: values.title,
      price: values.price,
      description: values.description,
      categoryId: Number(values.categoryId),
      images: [values.images],
    }

    const handleSuccess = () => {
      notifications.show({
        title: 'Muvaffaqiyatli!',
        message: isEdit
          ? 'Mahsulot muvaffaqiyatli yangilandi'
          : 'Mahsulot muvaffaqiyatli saqlandi',
        color: 'green',
      })
      form.reset()
      if (onSuccessCallback) onSuccessCallback()
    }

    const handleError = () => {
      notifications.show({
        title: 'Xatolik!',
        message: isEdit
          ? 'Mahsulotni yangilashda xatolik yuz berdi'
          : 'Mahsulotni saqlashda xatolik yuz berdi',
        color: 'red',
      })
    }

    if (isEdit) {
      updateMutation.mutate(
        { id: Number(product.id), data: payload },
        {
          onSuccess: handleSuccess,
          onError: handleError,
          onSettled: () => setLoading(false),
        }
      )
    } else {
      createMutation.mutate(payload, {
        onSuccess: handleSuccess,
        onError: handleError,
        onSettled: () => setLoading(false),
      })
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Mahsulot nomi"
          placeholder="Masalan: iPhone 15 Pro"
          withAsterisk
          radius="md"
          size="md"
          {...form.getInputProps('title')}
        />

        <NumberInput
          label="Narxi ($)"
          placeholder="0"
          withAsterisk
          min={0}
          radius="md"
          size="md"
          {...form.getInputProps('price')}
        />

        <Select
          label="Kategoriya"
          placeholder="Kategoriyani tanlang"
          withAsterisk
          radius="md"
          size="md"
          data={categories.map((c: ICategory) => ({
            value: String(c.id),
            label: c.name,
          }))}
          {...form.getInputProps('categoryId')}
        />

        <TextInput
          label="Rasm havolasi (URL)"
          placeholder="https://..."
          withAsterisk
          radius="md"
          size="md"
          {...form.getInputProps('images')}
        />

        <Textarea
          label="Tavsif"
          placeholder="Mahsulot haqida ma'lumot..."
          withAsterisk
          minRows={4}
          radius="md"
          size="md"
          {...form.getInputProps('description')}
        />

        <Group justify="flex-end" mt="xl">
          <Button
            type="button"
            variant="subtle"
            color="gray"
            radius="xl"
            size="md"
            onClick={() => form.reset()}
          >
            Tozalash
          </Button>
          <Button
            type="submit"
            loading={loading}
            color="anor"
            radius="xl"
            size="md"
            px={32}
          >
            {isEdit ? 'Yangilash' : 'Saqlash'}
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
