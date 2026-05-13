import { getUserOrders, createOrder } from '@/lib/actions/order'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/prisma', () => ({
  default: {
    order: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    cartItem: {
      deleteMany: vi.fn(),
    },
    $transaction: vi.fn((callback) => callback(prisma)),
  },
}))

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('order actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getServerSession).mockResolvedValue({ user: { id: 'user-1' } } as any)
  })

  it('getUserOrders should fetch orders for logged in user', async () => {
    vi.mocked(prisma.order.findMany).mockResolvedValue([{ id: 'o1', total: 100 }] as any)

    const result = await getUserOrders()

    expect(prisma.order.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { userId: 'user-1' }
    }))
    expect(result).toHaveLength(1)
  })

  it('createOrder should create order and clear cart in transaction', async () => {
    vi.mocked(prisma.order.create).mockResolvedValue({ id: 'o-new' } as any)

    const result = await createOrder({
      shippingAddress: { city: 'NY' },
      paymentMethod: 'STRIPE',
      items: [{ productId: 'p1', quantity: 1, price: 100 }],
      total: 100
    })

    expect(prisma.$transaction).toHaveBeenCalled()
    expect(prisma.order.create).toHaveBeenCalled()
    expect(prisma.cartItem.deleteMany).toHaveBeenCalledWith({
      where: { userId: 'user-1' }
    })
    expect(result.success).toBe(true)
  })

  it('createOrder should work for guest (no session)', async () => {
    vi.mocked(getServerSession).mockResolvedValue(null)
    vi.mocked(prisma.order.create).mockResolvedValue({ id: 'o-guest' } as any)

    const result = await createOrder({
      shippingAddress: { city: 'London' },
      paymentMethod: 'PAYPAL',
      items: [{ productId: 'p2', quantity: 1, price: 200 }],
      total: 200
    })

    expect(prisma.order.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        userId: null
      })
    }))
    expect(result.success).toBe(true)
  })
})
