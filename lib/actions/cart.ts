"use server"

import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function getCart() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return []

  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: session.user.id },
      include: {
        product: true,
      },
    })
    return cartItems
  } catch (error) {
    console.error("Error fetching cart:", error)
    return []
  }
}

export async function addToCart(productId: string, quantity: number, color?: string, variant?: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return { error: "Not authenticated" }

  try {
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId: session.user.id,
        productId,
        color,
        variant,
      },
    })

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          userId: session.user.id,
          productId,
          quantity,
          color,
          variant,
        },
      })
    }

    revalidatePath("/cart")
    return { success: true }
  } catch (error) {
    console.error("Error adding to cart:", error)
    return { error: "Failed to add to cart" }
  }
}

export async function updateCartItem(itemId: string, quantity: number) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return { error: "Not authenticated" }

  try {
    if (quantity <= 0) {
      await prisma.cartItem.delete({
        where: { id: itemId, userId: session.user.id },
      })
    } else {
      await prisma.cartItem.update({
        where: { id: itemId, userId: session.user.id },
        data: { quantity },
      })
    }

    revalidatePath("/cart")
    return { success: true }
  } catch (error) {
    console.error("Error updating cart item:", error)
    return { error: "Failed to update cart" }
  }
}

export async function removeFromCart(itemId: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return { error: "Not authenticated" }

  try {
    await prisma.cartItem.delete({
      where: { id: itemId, userId: session.user.id },
    })

    revalidatePath("/cart")
    return { success: true }
  } catch (error) {
    console.error("Error removing from cart:", error)
    return { error: "Failed to remove from cart" }
  }
}
