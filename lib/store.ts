import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Product } from "@/generated/prisma/client"

export interface ProductVariant {
  id: string
  name: string
  priceDelta: number
}

export interface ProductColor {
  name: string
  value: string
}

export interface ProductDimensions {
  width: number | string
  depth: number | string
  height: number | string
}

export interface CartItem extends Omit<Product, 'variants' | 'colors' | 'dimensions'> {
  variants: ProductVariant[] | null
  colors: ProductColor[] | null
  dimensions: ProductDimensions | null
  quantity: number
  selectedColor?: string
  selectedVariant?: string
}

interface CartStore {
  items: CartItem[]
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
  addItem: (product: Product, quantity: number, color?: string, variant?: string) => void
  removeItem: (productId: string, color?: string, variant?: string) => void
  updateQuantity: (productId: string, quantity: number, color?: string, variant?: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      
      addItem: (product, quantity, color, variant) => {
        const currentItems = get().items
        const existingItemIndex = currentItems.findIndex(
          (item) => 
            item.id === product.id && 
            item.selectedColor === color && 
            item.selectedVariant === variant
        )

        // Cast JSON fields from Prisma safely
        const cartItemBase: Omit<CartItem, 'quantity' | 'selectedColor' | 'selectedVariant'> = {
          ...product,
          price: Number(product.price) as unknown as typeof product.price,
          variants: (product.variants as unknown as ProductVariant[]) || null,
          colors: (product.colors as unknown as ProductColor[]) || null,
          dimensions: (product.dimensions as unknown as ProductDimensions) || null
        }

        if (existingItemIndex > -1) {
          const updatedItems = [...currentItems]
          updatedItems[existingItemIndex].quantity += quantity
          set({ items: updatedItems })
        } else {
          set({ 
            items: [...currentItems, { ...cartItemBase, quantity, selectedColor: color, selectedVariant: variant }] 
          })
        }
      },

      removeItem: (productId, color, variant) => {
        set({
          items: get().items.filter(
            (item) => 
              !(item.id === productId && 
                item.selectedColor === color && 
                item.selectedVariant === variant)
          )
        })
      },

      updateQuantity: (productId, quantity, color, variant) => {
        const updatedItems = get().items.map((item) => {
          if (
            item.id === productId && 
            item.selectedColor === color && 
            item.selectedVariant === variant
          ) {
            return { ...item, quantity: Math.max(1, quantity) }
          }
          return item
        })
        set({ items: updatedItems })
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          let price = Number(item.price)
          if (item.selectedVariant && item.variants) {
            const variant = item.variants.find(v => v.id === item.selectedVariant)
            if (variant?.priceDelta) {
              price += variant.priceDelta
            }
          }
          return total + price * item.quantity
        }, 0)
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      }
    }),
    {
      name: "furein-cart-storage",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !["_hasHydrated"].includes(key))
        ),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)

interface User {
  id: string
  email: string
  name: string
}

interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "furein-user-storage",
    }
  )
)
