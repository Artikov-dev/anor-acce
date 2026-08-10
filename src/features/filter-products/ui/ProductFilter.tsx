import { Button, Group, TextInput, NumberInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useCategories, type ICategory } from '@/entities/category'
import { useSearchRequestParams } from '@/shared'
import type { TProductParams } from '@/entities/product'

export const ProductFilter = () => {
  const { searchParams, setSearchParams } = useSearchRequestParams<
    TProductParams & { price_min?: string; price_max?: string }
  >()

  const { data: categories } = useCategories()

  const activeCategory = searchParams.categoryId ?? ''

  const [searchValue, setSearchValue] = useState(searchParams.search ?? '')
  const [debouncedSearch] = useDebouncedValue(searchValue, 400)

  const [priceMin, setPriceMin] = useState<number | string>(
    searchParams.price_min ? Number(searchParams.price_min) : ''
  )
  const [priceMax, setPriceMax] = useState<number | string>(
    searchParams.price_max ? Number(searchParams.price_max) : ''
  )

  const [debouncedPriceMin] = useDebouncedValue(priceMin, 600)
  const [debouncedPriceMax] = useDebouncedValue(priceMax, 600)

  useEffect(() => {
    setSearchParams({ key: 'search', value: debouncedSearch })
  }, [debouncedSearch, setSearchParams])

  useEffect(() => {
    setSearchParams({ key: 'price_min', value: debouncedPriceMin })
  }, [debouncedPriceMin, setSearchParams])

  useEffect(() => {
    setSearchParams({ key: 'price_max', value: debouncedPriceMax })
  }, [debouncedPriceMax, setSearchParams])

  const onCategoryClick = (categoryId: string) => {
    setSearchParams({ key: 'categoryId', value: categoryId })
  }

  const resetFilters = () => {
    setSearchParams({ key: 'categoryId', value: '' })
    setSearchValue('')
    setPriceMin('')
    setPriceMax('')
  }

  return (
    <Group justify="center" gap="md" align="flex-end" wrap="wrap">
      <Button
        radius="xl"
        color="red"
        variant={activeCategory === '' ? 'filled' : 'default'}
        onClick={() => onCategoryClick('')}
      >
        Barchasi
      </Button>

      {categories?.map((category: ICategory) => (
        <Button
          key={category.id}
          radius="xl"
          color="red"
          variant={
            activeCategory === String(category.id) ? 'filled' : 'default'
          }
          onClick={() => onCategoryClick(String(category.id))}
        >
          {category.name}
        </Button>
      ))}

      <TextInput
        w={220}
        radius="xl"
        placeholder="Nomi bo'yicha qidirish..."
        value={searchValue}
        onChange={(event) => setSearchValue(event.currentTarget.value)}
      />

      <NumberInput
        w={110}
        radius="xl"
        placeholder="Min ($)"
        value={priceMin}
        onChange={(value) => setPriceMin(value)}
        min={0}
      />
      <NumberInput
        w={110}
        radius="xl"
        placeholder="Max ($)"
        value={priceMax}
        onChange={(value) => setPriceMax(value)}
        min={0}
      />

      <Button radius="xl" variant="light" color="gray" onClick={resetFilters}>
        Tozalash
      </Button>
    </Group>
  )
}
