export interface ICategory {
  id: number
  name: string
  slug: string
  image: string
}

export interface IProduct {
  id: number
  title: string
  slug: string
  price: number
  description: string
  category: ICategory
  images: string[]
}

export interface CreateProductDto {
  title: string
  price: number
  description: string
  categoryId: number
  images: string[]
}

export interface UpdateProductDto {
  title?: string
  price?: number
  description?: string
  categoryId?: number
  images?: string[]
}

export interface ProductQueryParams {
  title?: string
  search?: string
  categoryId?: number | string
  offset?: number
  limit?: number
  page?: number | string
  size?: number | string
  sortBy?: 'price_asc' | 'price_desc' | 'default'
}

export type TProductParams = ProductQueryParams
