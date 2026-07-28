import type { IProduct, ICategory } from '@/types/product'

const STORAGE_KEY = 'admin_created_products'

export const getAdminProducts = (): IProduct[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (e) {
    console.error('Error reading admin products from localStorage', e)
    return []
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
}
