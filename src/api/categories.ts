import { $api } from './api'
import type {
  ICategory,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@/types/category'

export const getCategoriesApi = async (): Promise<ICategory[]> => {
  const response = await $api.get<ICategory[]>('/categories')
  return response.data
}

export const getCategoryApi = async (id: number): Promise<ICategory> => {
  const response = await $api.get<ICategory>(`/categories/${id}`)
  return response.data
}

export const createCategoryApi = async (
  dto: CreateCategoryDto
): Promise<ICategory> => {
  const response = await $api.post<ICategory>('/categories/', dto)
  return response.data
}

export const updateCategoryApi = async (
  id: number,
  dto: UpdateCategoryDto
): Promise<ICategory> => {
  const response = await $api.put<ICategory>(`/categories/${id}`, dto)
  return response.data
}

export const deleteCategoryApi = async (id: number): Promise<boolean> => {
  const response = await $api.delete<boolean>(`/categories/${id}`)
  return response.data
}
