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
