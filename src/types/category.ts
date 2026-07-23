import type { ICategory } from './product'

export interface CreateCategoryDto {
  name: string
  image: string
}

export interface UpdateCategoryDto {
  name?: string
  image?: string
}

export type { ICategory }
