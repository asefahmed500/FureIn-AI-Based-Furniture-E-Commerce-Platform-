"use server"

import { headers } from "next/headers"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { OrderStatus } from "@/generated/prisma/client"
import { z } from "zod"

const VALID_PAYMENT_METHODS = ["card", "paypal", "crypto"] as const
const PaymentMethodSchema = z.enum(VALID_PAYMENT_METHODS)

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 60_000
const RATE_LIMIT_MAX = 5

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(key)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

const ShippingAddressSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(1),
  apartment: z.string().optional().nullable(),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
})

export async function createOrder(data: {
  shippingAddress: unknown
  paymentMethod: string
  items: { productId: string; quantity: number; price: number; variant?: string }[]
  total: number
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown"
    if (isRateLimited(`order:anon:${ip}`)) {
      return { error: "Too many requests. Please try again later." }
    }
  }

  const paymentResult = PaymentMethodSchema.safeParse(data.paymentMethod)
  if (!paymentResult.success) {
    return { error: "Invalid payment method" }
  }

  const validatedAddress = ShippingAddressSchema.safeParse(data.shippingAddress)
  if (!validatedAddress.success) {
    return { error: "Invalid shipping address configuration" }
  }

  if (!data.items || data.items.length === 0) {
    return { error: "Order must contain at least one item" }
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const productIds = data.items.map((item) => item.productId)
      const products = await tx.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, price: true, stock: true },
      })

      const priceMap = new Map(products.map((p) => [p.id, p]))

      for (const item of data.items) {
        const dbProduct = priceMap.get(item.productId)
        if (!dbProduct) {
          throw new Error(`Product ${item.productId} not found`)
        }
        if (dbProduct.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${dbProduct.id}`)
        }
      }

      let serverTotal = 0
      for (const item of data.items) {
        const dbPrice = priceMap.get(item.productId)!
        serverTotal += Number(dbPrice.price) * item.quantity
      }
      serverTotal = Math.round(serverTotal * 100) / 100

      const order = await tx.order.create({
        data: {
          userId: session?.user?.id || null,
          total: serverTotal,
          status: "PENDING",
          shippingAddress: validatedAddress.data,
          paymentMethod: data.paymentMethod,
          items: {
            create: data.items.map((item) => {
              const dbPrice = priceMap.get(item.productId)!
              return {
                productId: item.productId,
                quantity: item.quantity,
                price: dbPrice.price,
                variant: item.variant,
              }
            }),
          },
        },
      })

      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        })
      }

      if (session?.user?.id) {
        await tx.cartItem.deleteMany({
          where: { userId: session.user.id },
        })
      }

      return order
    })

    if (session) {
      revalidatePath("/dashboard/orders")
    }
    
    return { success: true, orderId: result.id }
  } catch (error) {
    console.error("Error creating order:", error)
    const message = error instanceof Error ? error.message : "Failed to process order"
    return { error: message }
  }
}

export async function getUserOrders() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return []

  try {
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return orders
  } catch (error) {
    console.error("Error fetching user orders:", error)
    return []
  }
}

export async function getOrderById(id: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return null

  try {
    const order = await prisma.order.findUnique({
      where: { id, userId: session.user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })
    return order
  } catch (error) {
    console.error("Error fetching order:", error)
    return null
  }
}

export async function getAllOrders(params?: { query?: string; page?: number; status?: string }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    throw new Error("Forbidden: Admin access required")
  }

  const { query, page = 1, status } = params || {}
  const safePage = Math.max(1, page)
  const take = 20
  const skip = (safePage - 1) * take

  const validStatuses = Object.values(OrderStatus)
  const statusFilter = status && status !== "ALL" && validStatuses.includes(status as OrderStatus)
    ? { status: status as OrderStatus }
    : {}

  try {
    const where = {
      ...statusFilter,
      ...(query ? {
        OR: [
          { id: { contains: query, mode: "insensitive" as const } },
          { user: { name: { contains: query, mode: "insensitive" as const } } },
          { user: { email: { contains: query, mode: "insensitive" as const } } },
        ]
      } : {}),
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            }
          },
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take,
        skip,
      }),
      prisma.order.count({ where })
    ])

    return { orders, total, pages: Math.ceil(total / take) }
  } catch (error) {
    console.error("Error fetching all orders:", error)
    return { orders: [] as never, total: 0, pages: 0 }
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    throw new Error("Forbidden: Admin access required")
  }

  const validStatuses = Object.values(OrderStatus)
  if (!validStatuses.includes(status as OrderStatus)) {
    return { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` }
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: status as OrderStatus },
    })
    revalidatePath("/admin/orders")
    revalidatePath("/dashboard/orders")
    revalidatePath(`/dashboard/orders/${orderId}`)
    return { success: true }
  } catch (error) {
    console.error("Error updating order status:", error)
    return { error: "Failed to update order status" }
  }
}
