import type { IProduct } from '@/entities/product'

export interface CartItem {
  product: IProduct
  quantity: number
}

export interface CartState {
  items: CartItem[]
  addToCart: (product: IProduct, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalCount: () => number
  getTotalPrice: () => number
}
