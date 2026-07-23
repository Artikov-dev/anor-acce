import { $api } from './api'
import type {
  IProduct,
  CreateProductDto,
  UpdateProductDto,
  ProductQueryParams,
} from '@/types/product'

export const getProductsApi = async (
  params?: ProductQueryParams
): Promise<IProduct[]> => {
  const queryParams: Record<string, string | number> = {}

  if (params?.title) queryParams.title = params.title
  if (params?.categoryId) queryParams.categoryId = params.categoryId
  if (params?.offset !== undefined) queryParams.offset = params.offset
  if (params?.limit !== undefined) queryParams.limit = params.limit

  const response = await $api.get<IProduct[]>('/products', {
    params: queryParams,
  })

  let data = response.data

  if (params?.sortBy === 'price_asc') {
    data = [...data].sort((a, b) => a.price - b.price)
  } else if (params?.sortBy === 'price_desc') {
    data = [...data].sort((a, b) => b.price - a.price)
  }

  return data
}

export const getProductApi = async (id: number): Promise<IProduct> => {
  const response = await $api.get<IProduct>(`/products/${id}`)
  return response.data
}

export const createProductApi = async (
  dto: CreateProductDto
): Promise<IProduct> => {
  const response = await $api.post<IProduct>('/products/', dto)
  return response.data
}

export const updateProductApi = async (
  id: number,
  dto: UpdateProductDto
): Promise<IProduct> => {
  const response = await $api.put<IProduct>(`/products/${id}`, dto)
  return response.data
}

export const deleteProductApi = async (id: number): Promise<boolean> => {
  const response = await $api.delete<boolean>(`/products/${id}`)
  return response.data
}
