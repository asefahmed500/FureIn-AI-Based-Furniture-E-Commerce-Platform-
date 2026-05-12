"use server"

import prisma from "@/lib/prisma"

export async function getProducts(params?: { category?: string; query?: string }) {
  try {
    const { category, query } = params || {}

    const products = await prisma.product.findMany({
      where: {
        ...(category && category !== "all" ? { category: { slug: category } } : {}),
        ...(query ? { name: { contains: query, mode: "insensitive" } } : {}),
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
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
      where: { isNew: true }, // Placeholder logic or add isBestSeller to schema
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
      where: { originalPrice: { not: null } },
      take: 4,
      include: { category: true },
    })
  } catch (error) {
    console.error("Error fetching flash sale products:", error)
    return []
  }
}
