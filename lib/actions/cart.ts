"use server"

import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

function validateId(id: string): boolean {
  return typeof id === "string" && id.length > 0 && id.length <= 100
}

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
    throw error
  }
}

export async function addToCart(productId: string, quantity: number, color?: string, variant?: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return { error: "Not authenticated" }

  if (!validateId(productId)) {
    return { error: "Invalid product ID" }
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    return { error: "Quantity must be a positive integer" }
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, stock: true, isArchived: true },
    })

    if (!product || product.isArchived) {
      return { error: "Product not found" }
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId: session.user.id,
        productId,
        color,
        variant,
      },
    })

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity
      if (newQuantity > product.stock) {
        return { error: "Not enough stock available" }
      }
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      })
    } else {
      if (quantity > product.stock) {
        return { error: "Not enough stock available" }
      }
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

  if (!validateId(itemId)) {
    return { error: "Invalid cart item ID" }
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    return { error: "Quantity must be a positive integer" }
  }

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

  if (!validateId(itemId)) {
    return { error: "Invalid cart item ID" }
  }

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
