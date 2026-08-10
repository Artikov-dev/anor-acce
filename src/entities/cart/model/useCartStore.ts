import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartState } from './types'
import type { IProduct } from '@/entities/product'

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product: IProduct, quantity: number = 1) => {
        const { items } = get()
        const existingIndex = items.findIndex(
          (item) => item.product.id === product.id
        )

        if (existingIndex > -1) {
          const updatedItems = [...items]
          updatedItems[existingIndex].quantity += quantity
          set({ items: updatedItems })
        } else {
          set({ items: [...items, { product, quantity }] })
        }
      },

      removeFromCart: (productId: number) => {
        const { items } = get()
        set({ items: items.filter((item) => item.product.id !== productId) })
      },

      updateQuantity: (productId: number, quantity: number) => {
        const { items } = get()
        if (quantity <= 0) {
          set({ items: items.filter((item) => item.product.id !== productId) })
          return
        }
        set({
          items: items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalCount: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        const { items } = get()
        return items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
