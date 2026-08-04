import type { ICategory } from '@/entities/category'
import type { IProduct } from '../model/types'

const STORAGE_KEY = 'admin_created_products'
const STORAGE_KEY_DELETED = 'admin_deleted_products'

export const getAdminProducts = (): IProduct[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (e) {
    console.error('Error reading admin products from localStorage', e)
    return []
  }
}

export const getDeletedAdminProducts = (): number[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_DELETED)
    return data ? JSON.parse(data) : []
  } catch (e) {
    console.error('Error reading deleted admin products from localStorage', e)
    return []
  }
}

export const addDeletedAdminProduct = (id: number): void => {
  const current = getDeletedAdminProducts()
  if (!current.includes(id)) {
    const updated = [...current, id]
    try {
      localStorage.setItem(STORAGE_KEY_DELETED, JSON.stringify(updated))
    } catch (e) {
      console.error('Error saving deleted product ID to localStorage', e)
    }
  }
}

export const removeDeletedAdminProduct = (id: number): void => {
  const current = getDeletedAdminProducts()
  const updated = current.filter((deletedId) => deletedId !== id)
  try {
    localStorage.setItem(STORAGE_KEY_DELETED, JSON.stringify(updated))
  } catch (e) {
    console.error('Error removing deleted product ID from localStorage', e)
  }
}

export const addAdminProduct = (
  product: Partial<IProduct> & {
    title: string
    price: number
    categoryId?: number
  }
): IProduct => {
  const current = getAdminProducts()

  const categoryObj: ICategory = product.category || {
    id: product.categoryId || 1,
    name: 'Kategoriya',
    slug: 'kategoriya',
    image: 'https://i.imgur.com/QkIa5tT.jpeg',
  }

  const newProduct: IProduct = {
    id: product.id || Date.now(),
    title: product.title,
    slug: product.slug || product.title.toLowerCase().replace(/\s+/g, '-'),
    price: product.price,
    description: product.description || '',
    category: categoryObj,
    images:
      product.images && product.images.length > 0
        ? product.images
        : ['https://i.imgur.com/QkIa5tT.jpeg'],
  }

  removeDeletedAdminProduct(newProduct.id)

  const filtered = current.filter((p) => p.id !== newProduct.id)
  const updated = [newProduct, ...filtered]

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (e) {
    console.error('Error saving admin product to localStorage', e)
  }

  return newProduct
}

export const updateAdminProduct = (
  id: number,
  updatedFields: Partial<IProduct>
): void => {
  removeDeletedAdminProduct(id)
  const current = getAdminProducts()
  const updated = current.map((p) => {
    if (p.id === id) {
      return {
        ...p,
        ...updatedFields,
        category: updatedFields.category || p.category,
      }
    }
    return p
  })
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (e) {
    console.error('Error updating admin product in localStorage', e)
  }
}

export const removeAdminProduct = (id: number): void => {
  const current = getAdminProducts()
  const updated = current.filter((p) => p.id !== id)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (e) {
    console.error('Error removing admin product from localStorage', e)
  }
  addDeletedAdminProduct(id)
}
