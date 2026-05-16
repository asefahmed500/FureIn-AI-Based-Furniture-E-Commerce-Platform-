"use server"

import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

async function assertAdmin() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    throw new Error("Forbidden: Admin access required")
  }
}

const orderWhere = { status: { not: "CANCELLED" as const } }

export async function getSalesStats() {
  await assertAdmin()

  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    const [
      totalRevenueAgg,
      monthRevenueAgg,
      lastMonthRevenueAgg,
      totalOrders,
      monthOrders,
      lastMonthOrders,
      totalCustomers,
      lastMonthCustomers,
      activeOrders,
      totalProducts,
    ] = await Promise.all([
      prisma.order.aggregate({ where: orderWhere, _sum: { total: true } }),
      prisma.order.aggregate({
        where: { createdAt: { gte: startOfMonth }, ...orderWhere },
        _sum: { total: true },
      }),
      prisma.order.aggregate({
        where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth }, ...orderWhere },
        _sum: { total: true },
      }),
      prisma.order.count({ where: orderWhere }),
      prisma.order.count({ where: { createdAt: { gte: startOfMonth }, ...orderWhere } }),
      prisma.order.count({ where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth }, ...orderWhere } }),
      prisma.user.count({ where: { role: "USER" } }),
      prisma.user.count({ where: { role: "USER", createdAt: { lt: startOfMonth } } }),
      prisma.order.count({ where: { status: { in: ["PENDING", "PROCESSING"] as const } } }),
      prisma.product.count(),
    ])

    const totalRevenue = Number(totalRevenueAgg._sum?.total ?? 0)
    const thisMonthRevenue = Number(monthRevenueAgg._sum?.total ?? 0)
    const lastMonthRevenue = Number(lastMonthRevenueAgg._sum?.total ?? 0)

    const revenueChange = lastMonthRevenue === 0 ? (thisMonthRevenue > 0 ? 100 : 0) : Math.round(((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
    const ordersChange = lastMonthOrders === 0 ? (monthOrders > 0 ? 100 : 0) : Math.round(((monthOrders - lastMonthOrders) / lastMonthOrders) * 100)
    const customersChange = lastMonthCustomers === 0 ? (totalCustomers > 0 ? 100 : 0) : Math.round(((totalCustomers - lastMonthCustomers) / lastMonthCustomers) * 100)

    return {
      totalRevenue,
      thisMonthRevenue,
      revenueChange,
      revenueGrowth: revenueChange,
      totalOrders,
      monthOrders,
      ordersChange,
      totalCustomers,
      customersChange,
      activeOrders,
      totalProducts,
    }
  } catch (error) {
    console.error("Error fetching sales stats:", error)
    return {
      totalRevenue: 0,
      thisMonthRevenue: 0,
      revenueChange: 0,
      revenueGrowth: 0,
      totalOrders: 0,
      monthOrders: 0,
      ordersChange: 0,
      totalCustomers: 0,
      customersChange: 0,
      activeOrders: 0,
      totalProducts: 0,
    }
  }
}

export async function getRevenueTrends() {
  await assertAdmin()

  try {
    const now = new Date()

    const months = await Promise.all(
      Array.from({ length: 7 }, async (_, i) => {
        const start = new Date(now.getFullYear(), now.getMonth() - (6 - i), 1)
        const end = new Date(now.getFullYear(), now.getMonth() - (6 - i) + 1, 0)

        const result = await prisma.order.aggregate({
          where: {
            createdAt: { gte: start, lte: end },
            status: { not: "CANCELLED" as const },
          },
          _sum: { total: true },
        })

        return {
          name: start.toLocaleString("default", { month: "short" }),
          total: Math.round(Number(result._sum?.total ?? 0)),
        }
      })
    )

    return months
  } catch (error) {
    console.error("Error fetching revenue trends:", error)
    return []
  }
}

export async function getRevenueByMonth() {
  await assertAdmin()

  try {
    const now = new Date()

    const months = await Promise.all(
      Array.from({ length: 6 }, async (_, i) => {
        const start = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
        const end = new Date(now.getFullYear(), now.getMonth() - (5 - i) + 1, 0)

        const result = await prisma.order.aggregate({
          where: {
            createdAt: { gte: start, lte: end },
            status: { not: "CANCELLED" as const },
          },
          _sum: { total: true },
          _count: true,
        })

        return {
          month: start.toLocaleString("default", { month: "short" }),
          revenue: Math.round(Number(result._sum?.total ?? 0)),
          orders: result._count,
        }
      })
    )

    return months
  } catch (error) {
    console.error("Error fetching revenue by month:", error)
    return []
  }
}

export async function getOrdersByStatus() {
  await assertAdmin()

  try {
    const statuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"] as const
    const results = await Promise.all(
      statuses.map(async (status) => ({
        status,
        count: await prisma.order.count({ where: { status } }),
      }))
    )
    return results
  } catch (error) {
    console.error("Error fetching orders by status:", error)
    return []
  }
}

export async function getTopProducts() {
  await assertAdmin()

  try {
    const items = await prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true, price: true },
      _count: { id: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    })

    const productIds = items.map((i) => i.productId)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: {
        id: true,
        name: true,
        price: true,
        images: true,
        category: { select: { name: true } },
      },
    })

    const topRevenue = Math.max(...items.map((i) => Number(i._sum.price ?? 0)), 1)

    return items.map((item) => {
      const product = products.find((p) => p.id === item.productId)
      const revenue = Number(item._sum.price ?? 0)
      return {
        ...product,
        id: product?.id || item.productId,
        name: product?.name || "Unknown Product",
        price: Number(product?.price || 0),
        images: product?.images || [],
        category: product?.category || { name: "Uncategorized" },
        totalSold: item._sum.quantity ?? 0,
        totalRevenue: revenue,
        _count: {
          orderItems: item._count.id,
        },
        contribution: Math.round((revenue / topRevenue) * 100),
      }
    })
  } catch (error) {
    console.error("Error fetching top products:", error)
    return []
  }
}
