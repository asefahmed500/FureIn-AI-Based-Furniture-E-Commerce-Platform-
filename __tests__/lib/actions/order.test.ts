import { getUserOrders, createOrder } from "@/lib/actions/order"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { describe, it, expect, vi, beforeEach } from "vitest"

const mockTx = {
  order: {
    create: vi.fn(),
  },
  product: {
    findMany: vi.fn(),
    update: vi.fn(),
  },
  cartItem: {
    deleteMany: vi.fn(),
  },
}

vi.mock("@/lib/prisma", () => {
  return {
    default: {
      order: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
        create: vi.fn(),
      },
      cartItem: {
        deleteMany: vi.fn(),
      },
      product: {
        findMany: vi.fn(),
        update: vi.fn(),
      },
      $transaction: vi.fn(async (callback: any) => callback(mockTx)),
    },
  }
})

vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}))

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}))

vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue(new Map([["x-forwarded-for", "127.0.0.1"]])),
}))

describe("order actions", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getServerSession).mockResolvedValue({ user: { id: "user-1" } } as any)
  })

  it("getUserOrders should fetch orders for logged in user", async () => {
    vi.mocked(prisma.order.findMany).mockResolvedValue([{ id: "o1", total: 100 }] as any)

    const result = await getUserOrders()

    expect(prisma.order.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { userId: "user-1" }
    }))
    expect(result).toHaveLength(1)
  })

  it("createOrder should reject empty items", async () => {
    const result = await createOrder({
      shippingAddress: {
        firstName: "John", lastName: "Doe", email: "john@test.com",
        phone: "1234567890", address: "123 Main St", city: "NY",
        state: "NY", postalCode: "10001", country: "US"
      },
      paymentMethod: "card",
      items: [],
      total: 0,
    })

    expect(result).toEqual({ error: "Order must contain at least one item" })
    expect(prisma.$transaction).not.toHaveBeenCalled()
  })

  it("createOrder should reject invalid payment method", async () => {
    const result = await createOrder({
      shippingAddress: {
        firstName: "John", lastName: "Doe", email: "john@test.com",
        phone: "1234567890", address: "123 Main St", city: "NY",
        state: "NY", postalCode: "10001", country: "US"
      },
      paymentMethod: "bitcoin",
      items: [{ productId: "p1", quantity: 1, price: 100 }],
      total: 100,
    })

    expect(result).toEqual({ error: "Invalid payment method" })
    expect(prisma.$transaction).not.toHaveBeenCalled()
  })

  it("createOrder should reject if product not found", async () => {
    mockTx.product.findMany.mockResolvedValue([{ id: "p-other" }] as any)

    const result = await createOrder({
      shippingAddress: {
        firstName: "John", lastName: "Doe", email: "john@test.com",
        phone: "1234567890", address: "123 Main St", city: "NY",
        state: "NY", postalCode: "10001", country: "US"
      },
      paymentMethod: "card",
      items: [{ productId: "p-missing", quantity: 1, price: 100 }],
      total: 100,
    })

    expect(result).toEqual({ error: "Product p-missing not found" })
  })

  it("createOrder should reject if insufficient stock", async () => {
    mockTx.product.findMany.mockResolvedValue([{ id: "p1", price: 100, stock: 0 }] as any)

    const result = await createOrder({
      shippingAddress: {
        firstName: "John", lastName: "Doe", email: "john@test.com",
        phone: "1234567890", address: "123 Main St", city: "NY",
        state: "NY", postalCode: "10001", country: "US"
      },
      paymentMethod: "card",
      items: [{ productId: "p1", quantity: 1, price: 100 }],
      total: 100,
    })

    expect(result).toEqual({ error: "Insufficient stock for product p1" })
  })

  it("createOrder should create order using server-verified prices", async () => {
    mockTx.product.findMany.mockResolvedValue([{ id: "p1", price: 50, stock: 10 }] as any)
    mockTx.order.create.mockResolvedValue({ id: "o-new" })
    mockTx.product.update.mockResolvedValue({} as any)
    mockTx.cartItem.deleteMany.mockResolvedValue({ count: 0 } as any)

    const result = await createOrder({
      shippingAddress: {
        firstName: "John", lastName: "Doe", email: "john@test.com",
        phone: "1234567890", address: "123 Main St", city: "NY",
        state: "NY", postalCode: "10001", country: "US"
      },
      paymentMethod: "card",
      items: [{ productId: "p1", quantity: 2, price: 999 }],
      total: 999,
    })

    expect(prisma.$transaction).toHaveBeenCalled()
    expect(mockTx.order.create).toHaveBeenCalled()
    expect(mockTx.product.update).toHaveBeenCalledWith({
      where: { id: "p1" },
      data: { stock: { decrement: 2 } },
    })
    expect(mockTx.cartItem.deleteMany).toHaveBeenCalledWith({
      where: { userId: "user-1" }
    })
    expect(result.success).toBe(true)
    expect(result.orderId).toBe("o-new")
  })

  it("createOrder should work for guest (no session)", async () => {
    vi.mocked(getServerSession).mockResolvedValue(null)
    mockTx.product.findMany.mockResolvedValue([{ id: "p2", price: 200, stock: 5 }] as any)
    mockTx.order.create.mockResolvedValue({ id: "o-guest" })
    mockTx.product.update.mockResolvedValue({} as any)

    const result = await createOrder({
      shippingAddress: {
        firstName: "Jane", lastName: "Doe", email: "jane@test.com",
        phone: "9876543210", address: "456 Side St", city: "London",
        state: "LDN", postalCode: "E1 6AN", country: "UK"
      },
      paymentMethod: "paypal",
      items: [{ productId: "p2", quantity: 1, price: 999 }],
      total: 999,
    })

    expect(mockTx.order.create).toHaveBeenCalled()
    expect(mockTx.cartItem.deleteMany).not.toHaveBeenCalled()
    expect(result.success).toBe(true)
  })
})
