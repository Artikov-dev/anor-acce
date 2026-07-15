import { Button, Group, TextInput, NumberInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { RiSearchLine } from '@remixicon/react'
import { useEffect, useState } from 'react'
import { useCategories } from '../../hooks/useProducts'
import { useSearchRequestParams } from '../../hooks/useSearchRequestParams'
import type { TProductParams } from '../../types/product'

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
  }, [debouncedSearch])

  useEffect(() => {
    setSearchParams({ key: 'price_min', value: debouncedPriceMin })
  }, [debouncedPriceMin])

  useEffect(() => {
    setSearchParams({ key: 'price_max', value: debouncedPriceMax })
  }, [debouncedPriceMax])

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
    <Group justify="center" gap="md" align="flex-end">
      <Button
        radius="xl"
        variant={activeCategory === '' ? 'filled' : 'default'}
        onClick={() => onCategoryClick('')}
      >
        Все
      </Button>

      {categories?.map((category) => (
        <Button
          key={category.id}
          radius="xl"
          variant={
            activeCategory === String(category.id) ? 'filled' : 'default'
          }
          onClick={() => onCategoryClick(String(category.id))}
        >
          {category.name}
        </Button>
      ))}

      <TextInput
        w={200}
        radius="xl"
        placeholder="Поиск по названию"
        leftSection={<RiSearchLine size={16} />}
        value={searchValue}
        onChange={(event) => setSearchValue(event.currentTarget.value)}
      />

      <NumberInput
        w={100}
        radius="xl"
        placeholder="От ($)"
        value={priceMin}
        onChange={(value) => setPriceMin(value)}
        min={0}
      />
      <NumberInput
        w={100}
        radius="xl"
        placeholder="До ($)"
        value={priceMax}
        onChange={(value) => setPriceMax(value)}
        min={0}
      />

      <Button radius="xl" variant="light" color="red" onClick={resetFilters}>
        Сбросить
      </Button>
    </Group>
  )
}
