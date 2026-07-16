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
import { useCreateProduct, useCategories } from '../../hooks/useProducts'
import type { ICategory } from '../../types/product'
export const CreateProduct = ({
  onSuccessCallback,
}: {
  onSuccessCallback?: () => void
}) => {
  const [loading, setLoading] = useState(false)
  const createMutation = useCreateProduct()
  const { data: categories = [] } = useCategories()

  const form = useForm({
    initialValues: {
      title: '',
      price: 0,
      description: '',
      categoryId: '',
      images: 'https://i.imgur.com/QkIa5tT.jpeg',
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

    createMutation.mutate(payload, {
      onSuccess: () => {
        notifications.show({
          title: 'Muvaffaqiyatli!',
          message: 'Mahsulot muvaffaqiyatli saqlandi',
          color: 'green',
        })
        form.reset()
        if (onSuccessCallback) onSuccessCallback()
      },
      onError: () => {
        notifications.show({
          title: 'Xatolik!',
          message: 'Mahsulotni saqlashda xatolik yuz berdi',
          color: 'red',
        })
      },
      onSettled: () => {
        setLoading(false)
      },
    })
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Mahsulot nomi"
          placeholder="Masalan: iPhone 15 Pro"
          withAsterisk
          {...form.getInputProps('title')}
        />

        <NumberInput
          label="Narxi ($)"
          placeholder="0"
          withAsterisk
          min={0}
          {...form.getInputProps('price')}
        />

        <Select
          label="Kategoriya"
          placeholder="Kategoriyani tanlang"
          withAsterisk
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
          {...form.getInputProps('images')}
        />

        <Textarea
          label="Tavsif"
          placeholder="Mahsulot haqida ma'lumot..."
          withAsterisk
          minRows={4}
          {...form.getInputProps('description')}
        />

        <Group justify="flex-end" mt="md">
          <Button
            type="button"
            variant="light"
            color="gray"
            onClick={() => form.reset()}
          >
            Tozalash
          </Button>
          <Button type="submit" loading={loading} color="blue">
            Saqlash
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
