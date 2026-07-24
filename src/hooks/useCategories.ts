import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import {
  getCategoriesApi,
  getCategoryApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from '@/api/categories'
import type {
  ICategory,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@/types/category'

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

  return useMutation<
    ICategory,
    AxiosError<{ message?: string }>,
    CreateCategoryDto
  >({
    mutationFn: (dto: CreateCategoryDto) => createCategoryApi(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ICategory,
    AxiosError<{ message?: string }>,
    { id: number; dto: UpdateCategoryDto }
  >({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateCategoryDto }) =>
      updateCategoryApi(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<boolean, AxiosError<{ message?: string }>, number>({
    mutationFn: (id: number) => deleteCategoryApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
