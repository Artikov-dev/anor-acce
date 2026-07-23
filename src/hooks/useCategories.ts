import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getCategoriesApi,
  getCategoryApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from '@/api/categories'
import type { CreateCategoryDto, UpdateCategoryDto } from '@/types/category'

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesApi,
    staleTime: 1000 * 60 * 5,
  })
}

export const useCategoryQuery = (id: number | null) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => getCategoryApi(id!),
    enabled: !!id,
  })
}

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateCategoryDto) => createCategoryApi(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateCategoryDto }) =>
      updateCategoryApi(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteCategoryApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
