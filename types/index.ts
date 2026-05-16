import { Prisma } from "@/generated/prisma/client"

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    category: true
    reviews: true
  }
}>

export type CategoryWithCount = Prisma.CategoryGetPayload<{
  include: {
    _count: {
      select: { products: true }
    }
  }
}>

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: {
    product: true
  }
}>

export interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone?: string
  address: string
  apartment?: string | null
  city: string
  state: string
  postalCode: string
  country: string
}

export type OrderWithRelations = Prisma.OrderGetPayload<{
  include: {
    user: {
      select: {
        name: true
        email: true
      }
    }
    items: {
      include: {
        product: true
      }
    }
  }
}>
