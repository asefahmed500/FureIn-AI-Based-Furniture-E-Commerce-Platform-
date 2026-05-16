import { addToCart, getCart, removeFromCart } from "@/lib/actions/cart"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("@/lib/prisma", () => ({
  default: {
    cartItem: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    product: {
      findUnique: vi.fn(),
    },
  },
}))

vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}))

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}))

describe("cart actions", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getServerSession).mockResolvedValue({ user: { id: "user-1" } } as any)
  })

  it("getCart should fetch items for logged in user", async () => {
    vi.mocked(prisma.cartItem.findMany).mockResolvedValue([{ id: "1", product: { id: "p1" } }] as any)

    const result = await getCart()

    expect(prisma.cartItem.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { userId: "user-1" }
    }))
    expect(result).toHaveLength(1)
  })

  it("addToCart should reject if product not found", async () => {
    vi.mocked(prisma.product.findUnique).mockResolvedValue(null)

    const result = await addToCart("p1", 2, "Teal", "v1")

    expect(result).toEqual({ error: "Product not found" })
    expect(prisma.cartItem.create).not.toHaveBeenCalled()
  })

  it("addToCart should reject if product archived", async () => {
    vi.mocked(prisma.product.findUnique).mockResolvedValue({ id: "p1", stock: 10, isArchived: true } as any)

    const result = await addToCart("p1", 2, "Teal", "v1")

    expect(result).toEqual({ error: "Product not found" })
    expect(prisma.cartItem.create).not.toHaveBeenCalled()
  })

  it("addToCart should reject if insufficient stock", async () => {
    vi.mocked(prisma.product.findUnique).mockResolvedValue({ id: "p1", stock: 1, isArchived: false } as any)

    const result = await addToCart("p1", 5, "Teal", "v1")

    expect(result).toEqual({ error: "Not enough stock available" })
    expect(prisma.cartItem.create).not.toHaveBeenCalled()
  })

  it("addToCart should create new item if not exists", async () => {
    vi.mocked(prisma.product.findUnique).mockResolvedValue({ id: "p1", stock: 10, isArchived: false } as any)
    vi.mocked(prisma.cartItem.findFirst).mockResolvedValue(null)
    vi.mocked(prisma.cartItem.create).mockResolvedValue({ id: "new-1" } as any)

    const result = await addToCart("p1", 2, "Teal", "v1")

    expect(result).not.toEqual({ error: expect.anything() })
    expect(prisma.cartItem.create).toHaveBeenCalledWith({
      data: {
        userId: "user-1",
        productId: "p1",
        quantity: 2,
        color: "Teal",
        variant: "v1",
      }
    })
  })

  it("addToCart should update quantity if item exists", async () => {
    vi.mocked(prisma.product.findUnique).mockResolvedValue({ id: "p1", stock: 10, isArchived: false } as any)
    vi.mocked(prisma.cartItem.findFirst).mockResolvedValue({ id: "existing-1", quantity: 1 } as any)
    vi.mocked(prisma.cartItem.update).mockResolvedValue({ id: "existing-1" } as any)

    const result = await addToCart("p1", 2, "Teal", "v1")

    expect(result).not.toEqual({ error: expect.anything() })
    expect(prisma.cartItem.update).toHaveBeenCalledWith({
      where: { id: "existing-1" },
      data: { quantity: 3 }
    })
  })

  it("addToCart should reject if combined quantity exceeds stock", async () => {
    vi.mocked(prisma.product.findUnique).mockResolvedValue({ id: "p1", stock: 5, isArchived: false } as any)
    vi.mocked(prisma.cartItem.findFirst).mockResolvedValue({ id: "existing-1", quantity: 4 } as any)

    const result = await addToCart("p1", 3, "Teal", "v1")

    expect(result).toEqual({ error: "Not enough stock available" })
  })

  it("removeFromCart should delete item", async () => {
    await removeFromCart("item-1")

    expect(prisma.cartItem.delete).toHaveBeenCalledWith({
      where: { id: "item-1", userId: "user-1" }
    })
  })
})
