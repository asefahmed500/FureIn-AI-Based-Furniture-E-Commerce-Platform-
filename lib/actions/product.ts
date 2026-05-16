"use server"

import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"

async function assertAdmin() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    throw new Error("Forbidden: Admin access required")
  }
}

export async function getProducts(params?: { 
  category?: string; 
  query?: string; 
  page?: number;
  limit?: number;
  includeArchived?: boolean;
}) {
  try {
    const { category, query, page = 1, limit = 20, includeArchived = false } = params || {}
    const skip = (page - 1) * limit

    const where: any = {
      ...(includeArchived ? {} : { isArchived: false }),
      ...(category && category !== "all" ? { category: { slug: category } } : {}),
      ...(query ? { name: { contains: query, mode: "insensitive" } } : {}),
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          reviews: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
        skip,
      }),
      prisma.product.count({ where })
    ])

    return { 
      products, 
      total, 
      pages: Math.ceil(total / limit) 
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    return { products: [], total: 0, pages: 0 }
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        reviews: true,
      },
    })
    return product
  } catch (error) {
    console.error("Error fetching product by slug:", error)
    return null
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    })
    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getBestSellers() {
  try {
    return await prisma.product.findMany({
      where: { isFeatured: true, isArchived: false },
      take: 8,
      include: { category: true },
    })
  } catch (error) {
    console.error("Error fetching best sellers:", error)
    return []
  }
}

export async function getTrendingProducts() {
  try {
    return await prisma.product.findMany({
      where: { isArchived: false },
      orderBy: { reviewCount: "desc" },
      take: 6,
      include: { category: true },
    })
  } catch (error) {
    console.error("Error fetching trending products:", error)
    return []
  }
}

export async function getFlashSaleProducts() {
  try {
    return await prisma.product.findMany({
      where: { isSale: true, isArchived: false },
      take: 4,
      include: { category: true },
    })
  } catch (error) {
    console.error("Error fetching flash sale products:", error)
    return []
  }
}

const ProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  originalPrice: z.number().positive().optional().nullable(),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  categoryId: z.string().min(1, "Category is required"),
  material: z.string().optional().nullable(),
  isFeatured: z.boolean().optional().default(false),
  isNew: z.boolean().optional().default(false),
  isSale: z.boolean().optional().default(false),
  images: z.array(z.string()).optional().default([]),
})

export type ProductFormData = z.infer<typeof ProductSchema>

export async function createProduct(data: ProductFormData) {
  await assertAdmin()

  const validated = ProductSchema.safeParse(data)
  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors }
  }

  try {
    const { categoryId, ...rest } = validated.data
    const product = await prisma.product.create({
      data: {
        ...rest,
        category: { connect: { id: categoryId } },
      },
    })

    revalidatePath("/admin/products")
    revalidatePath("/shop")
    return { success: true, product }
  } catch (error) {
    console.error("Error creating product:", error)
    return { error: "Failed to create product" }
  }
}

export async function updateProduct(id: string, data: Partial<ProductFormData>) {
  await assertAdmin()

  const validated = ProductSchema.partial().safeParse(data)
  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors }
  }

  try {
    const { categoryId, ...rest } = validated.data
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...rest,
        ...(categoryId ? { category: { connect: { id: categoryId } } } : {}),
      },
    })

    revalidatePath("/admin/products")
    revalidatePath("/shop")
    revalidatePath(`/product/${product.slug}`)
    return { success: true, product }
  } catch (error) {
    console.error("Error updating product:", error)
    return { error: "Failed to update product" }
  }
}

export async function deleteProduct(id: string) {
  await assertAdmin()

  try {
    const relatedOrders = await prisma.orderItem.count({ where: { productId: id } })
    if (relatedOrders > 0) {
      return { error: "Cannot delete: product has existing orders. Archive it instead." }
    }

    const product = await prisma.product.findUnique({
      where: { id },
      select: { slug: true },
    })

    await prisma.$transaction([
      prisma.review.deleteMany({ where: { productId: id } }),
      prisma.cartItem.deleteMany({ where: { productId: id } }),
      prisma.wishlistItem.deleteMany({ where: { productId: id } }),
      prisma.product.delete({ where: { id } }),
    ])

    revalidatePath("/admin/products")
    revalidatePath("/shop")
    if (product) revalidatePath(`/product/${product.slug}`)
    return { success: true }
  } catch (error) {
    console.error("Error deleting product:", error)
    return { error: "Failed to delete product" }
  }
}

export async function archiveProduct(id: string) {
  await assertAdmin()

  try {
    const product = await prisma.product.update({
      where: { id },
      data: { isArchived: true }
    })

    revalidatePath("/admin/products")
    revalidatePath("/shop")
    revalidatePath(`/product/${product.slug}`)
    return { success: true }
  } catch (error) {
    console.error("Error archiving product:", error)
    return { error: "Failed to archive product" }
  }
}

const ReviewSchema = z.object({
  productId: z.string().min(1),
  author: z.string().min(2),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(3),
  comment: z.string().min(10),
  image: z.string().optional(),
})

export async function createReview(data: {
  productId: string
  author: string
  rating: number
  title: string
  comment: string
  image?: string
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return { error: "Authentication required" }
  }

  const validated = ReviewSchema.safeParse(data)
  if (!validated.success) {
    return { error: "Invalid review data" }
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const existingReview = await tx.review.findFirst({
        where: { productId: data.productId, author: session.user.name || data.author },
      })
      if (existingReview) {
        throw new Error("You have already reviewed this product")
      }

      const product = await tx.product.findUnique({
        where: { id: data.productId },
        select: { id: true },
      })
      if (!product) {
        throw new Error("Product not found")
      }

      const review = await tx.review.create({
        data: {
          productId: data.productId,
          author: session.user.name || data.author,
          rating: data.rating,
          title: data.title,
          comment: data.comment,
          image: data.image,
        },
      })

      const agg = await tx.review.aggregate({
        where: { productId: data.productId },
        _avg: { rating: true },
        _count: { id: true },
      })

      await tx.product.update({
        where: { id: data.productId },
        data: {
          rating: Number(agg._avg.rating?.toFixed(1) || 0),
          reviewCount: agg._count.id,
        },
      })

      return review
    })

    const product = await prisma.product.findUnique({
      where: { id: data.productId },
      select: { slug: true },
    })

    if (product) {
      revalidatePath(`/product/${product.slug}`)
      revalidatePath("/shop")
      revalidatePath("/")
    }

    return { success: true, review: result }
  } catch (error) {
    console.error("Error creating review:", error)
    return { error: "Failed to submit review" }
  }
}
