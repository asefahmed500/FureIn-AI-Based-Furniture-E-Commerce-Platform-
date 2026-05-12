"use server"

import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function createOrder(data: {
  shippingAddress: unknown
  paymentMethod: string
  items: { productId: string; quantity: number; price: number; variant?: string }[]
  total: number
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return { error: "Not authenticated" }

  try {
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        total: data.total,
        status: "PENDING",
        shippingAddress: data.shippingAddress,
        paymentMethod: data.paymentMethod,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            variant: item.variant,
          })),
        },
      },
    })

    // Clear cart after order
    await prisma.cartItem.deleteMany({
      where: { userId: session.user.id },
    })

    revalidatePath("/dashboard/orders")
    return { success: true, orderId: order.id }
  } catch (error) {
    console.error("Error creating order:", error)
    return { error: "Failed to process order" }
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
