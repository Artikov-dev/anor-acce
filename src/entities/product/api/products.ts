import { $api } from '@/shared/api/api'
import type { ICategory } from '@/entities/category'
import type {
  IProduct,
  CreateProductDto,
  UpdateProductDto,
  ProductQueryParams,
} from '../model/types'
import {
  getAdminProducts,
  addAdminProduct,
  updateAdminProduct,
  removeAdminProduct,
} from '../lib/adminProducts'

export const getProductsApi = async (
  params?: ProductQueryParams
): Promise<IProduct[]> => {
  const queryParams: Record<string, string | number> = {}

  if (params?.title) queryParams.title = params.title
  if (params?.categoryId) queryParams.categoryId = params.categoryId
  if (params?.offset !== undefined) queryParams.offset = params.offset
  if (params?.limit !== undefined) queryParams.limit = params.limit

  let apiProducts: IProduct[] = []
  try {
    const response = await $api.get<IProduct[]>('/products', {
      params: queryParams,
    })
    apiProducts = response.data
  } catch (err) {
    console.error('API products fetch error:', err)
  }

  let adminProducts = getAdminProducts()

  if (params?.title) {
    const searchLower = params.title.toLowerCase()
    adminProducts = adminProducts.filter((p) =>
      p.title.toLowerCase().includes(searchLower)
    )
  }

  if (params?.categoryId) {
    adminProducts = adminProducts.filter(
      (p) => String(p.category?.id) === String(params.categoryId)
    )
  }

  const filteredApiProducts = apiProducts.filter(
    (p) => !adminProducts.some((ap) => ap.id === p.id)
  )

  let combined = [...adminProducts, ...filteredApiProducts]

  if (params?.sortBy === 'price_asc') {
    combined = [...combined].sort((a, b) => a.price - b.price)
  } else if (params?.sortBy === 'price_desc') {
    combined = [...combined].sort((a, b) => b.price - a.price)
  }

  return combined
}

export const getProductApi = async (id: number): Promise<IProduct> => {
  const adminProds = getAdminProducts()
  const foundAdmin = adminProds.find((p) => p.id === id)
  if (foundAdmin) return foundAdmin

  const response = await $api.get<IProduct>(`/products/${id}`)
  return response.data
}

export const createProductApi = async (
  dto: CreateProductDto & { category?: ICategory }
): Promise<IProduct> => {
  let createdProduct: IProduct | null = null

  try {
    const response = await $api.post<IProduct>('/products/', {
      title: dto.title,
      price: dto.price,
      description: dto.description,
      categoryId: dto.categoryId,
      images: dto.images,
    })
    createdProduct = response.data
  } catch (err) {
    console.warn('API POST failed, proceeding with local admin creation:', err)
  }

  const newProd = addAdminProduct({
    id: createdProduct?.id || Date.now(),
    title: dto.title,
    price: dto.price,
    description: dto.description,
    categoryId: dto.categoryId,
    category: dto.category || createdProduct?.category,
    images: dto.images,
  })

  return newProd
}

export const updateProductApi = async (
  id: number,
  dto: UpdateProductDto & { category?: ICategory }
): Promise<IProduct> => {
  updateAdminProduct(id, dto)
  try {
    const response = await $api.put<IProduct>(`/products/${id}`, dto)
    return response.data
  } catch (err) {
    const adminProds = getAdminProducts()
    const found = adminProds.find((p) => p.id === id)
    if (found) return found
    throw err
  }
}

export const deleteProductApi = async (id: number): Promise<boolean> => {
  removeAdminProduct(id)
  try {
    const response = await $api.delete<boolean>(`/products/${id}`)
    return response.data
  } catch {
    return true
  }
}
