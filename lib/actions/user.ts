"use server"

import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { Role } from "@/generated/prisma/client"
import bcrypt from "bcryptjs"

async function assertAdmin() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    throw new Error("Forbidden: Admin access required")
  }
  return session
}

export async function getUsers(params?: { query?: string; page?: number }) {
  await assertAdmin()

  const { query, page = 1 } = params || {}
  const take = 20
  const skip = (page - 1) * take

  const where = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" as const } },
          { email: { contains: query, mode: "insensitive" as const } },
        ],
      }
    : undefined

  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          _count: {
            select: { orders: true, wishlistItems: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take,
        skip,
      }),
      prisma.user.count({ where }),
    ])

    return { users, total, pages: Math.ceil(total / take) }
  } catch (error) {
    console.error("Error fetching users:", error)
    return { users: [], total: 0, pages: 0 }
  }
}

export async function updateUserRole(userId: string, role: Role) {
  await assertAdmin()

  const validRoles = Object.values(Role)
  if (!validRoles.includes(role)) {
    return { error: `Invalid role: ${role}` }
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    })
    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("Error updating user role:", error)
    return { error: "Failed to update role" }
  }
}

export async function getUserStats() {
  await assertAdmin()

  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const [total, newThisMonth, admins] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.user.count({ where: { role: "ADMIN" } }),
    ])

    return { total, newThisMonth, admins }
  } catch (error) {
    console.error("Error fetching user stats:", error)
    return { total: 0, newThisMonth: 0, admins: 0 }
  }
}

export async function deleteUser(userId: string) {
  const session = await assertAdmin()
  if (session.user.id === userId) {
    return { error: "Cannot delete your own account" }
  }

  try {
    const orderCount = await prisma.order.count({ where: { userId } })
    if (orderCount > 0) {
      return { error: "Cannot delete user with existing orders. Consider suspending instead." }
    }

    await prisma.$transaction([
      prisma.cartItem.deleteMany({ where: { userId } }),
      prisma.wishlistItem.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ])
    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("Error deleting user:", error)
    return { error: "Failed to delete user. User may have existing orders." }
  }
}

export async function getUserDashboardData() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return null

  try {
    const [orders, cartItems, wishlistItems] = await Promise.all([
      prisma.order.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      }),
      prisma.cartItem.count({
        where: { userId: session.user.id },
      }),
      prisma.wishlistItem.count({
        where: { userId: session.user.id },
      }),
    ])

    const totalSpent = orders.reduce((acc, order) => acc + Number(order.total), 0)
    const activeOrders = orders.filter(
      (o) => ["PENDING", "PROCESSING", "SHIPPED"].includes(o.status)
    ).length

    return {
      orders,
      stats: {
        activeOrders,
        totalSpent,
        cartItems,
        wishlistItems,
      },
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return null
  }
}

export async function getWishlist() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return []

  try {
    const wishlist = await prisma.wishlistItem.findMany({
      where: { userId: session.user.id },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    })
    return wishlist.map((item) => item.product)
  } catch (error) {
    console.error("Error fetching wishlist:", error)
    return []
  }
}

export async function toggleWishlist(productId: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return { error: "Authentication required" }
  }

  try {
    const existing = await prisma.wishlistItem.findFirst({
      where: {
        userId: session.user.id,
        productId,
      },
    })

    if (existing) {
      await prisma.wishlistItem.delete({
        where: { id: existing.id },
      })
      revalidatePath("/dashboard/wishlist")
      return { success: true, action: "removed" }
    } else {
      await prisma.wishlistItem.create({
        data: {
          userId: session.user.id,
          productId,
        },
      })
      revalidatePath("/dashboard/wishlist")
      return { success: true, action: "added" }
    }
  } catch (error) {
    console.error("Error toggling wishlist:", error)
    return { error: "Failed to update wishlist" }
  }
}

export async function updateProfile(data: {
  name?: string
  email?: string
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return { error: "Authentication required" }
  }

  if (data.name !== undefined && data.name.trim().length < 2) {
    return { error: "Name must be at least 2 characters" }
  }

  if (data.email) {
    const normalizedEmail = data.email.toLowerCase().trim()
    const existingUser = await prisma.user.findFirst({
      where: { email: normalizedEmail, NOT: { id: session.user.id } },
    })
    if (existingUser) {
      return { error: "Email is already in use" }
    }
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        email: data.email?.toLowerCase().trim(),
      },
    })
    revalidatePath("/dashboard/profile")
    return { success: true }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { error: "Failed to update profile" }
  }
}

export async function updatePassword(data: {
  currentPassword: string
  newPassword: string
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return { error: "Authentication required" }
  }

  if (data.newPassword.length < 8) {
    return { error: "New password must be at least 8 characters" }
  }
  if (!/[A-Z]/.test(data.newPassword)) {
    return { error: "Password must contain an uppercase letter" }
  }
  if (!/[a-z]/.test(data.newPassword)) {
    return { error: "Password must contain a lowercase letter" }
  }
  if (!/[0-9]/.test(data.newPassword)) {
    return { error: "Password must contain a digit" }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) return { error: "User not found" }
    if (!user.password) return { error: "No password set for this account" }

    const isPasswordValid = await bcrypt.compare(
      data.currentPassword,
      user.password
    )
    if (!isPasswordValid) {
      return { error: "Invalid current password" }
    }

    const isSamePassword = await bcrypt.compare(data.newPassword, user.password)
    if (isSamePassword) {
      return { error: "New password must be different from current password" }
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 12)
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating password:", error)
    return { error: "Failed to update password" }
  }
}

export async function toggleUserSuspension(userId: string) {
  const session = await assertAdmin()

  if (session.user.id === userId) {
    return { error: "Cannot suspend your own account" }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isSuspended: true },
    })

    if (!user) return { error: "User not found" }

    await prisma.user.update({
      where: { id: userId },
      data: { isSuspended: !user.isSuspended },
    })

    revalidatePath("/admin/users")
    return { success: true, isSuspended: !user.isSuspended }
  } catch (error) {
    console.error("Error toggling suspension:", error)
    return { error: "Failed to toggle suspension" }
  }
}
