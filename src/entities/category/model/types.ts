export interface ICategory {
  id: number
  name: string
  slug: string
  image: string
}

export interface CreateCategoryDto {
  name: string
  image: string
}

export interface UpdateCategoryDto {
  name?: string
  image?: string
}
