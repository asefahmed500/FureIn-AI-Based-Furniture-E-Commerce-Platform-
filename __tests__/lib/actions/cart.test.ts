import { addToCart, getCart, updateCartItem, removeFromCart } from '@/lib/actions/cart'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/prisma', () => ({
  default: {
    cartItem: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}))

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('cart actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getServerSession).mockResolvedValue({ user: { id: 'user-1' } } as any)
  })

  it('getCart should fetch items for logged in user', async () => {
    vi.mocked(prisma.cartItem.findMany).mockResolvedValue([{ id: '1', product: { id: 'p1' } }] as any)

    const result = await getCart()

    expect(prisma.cartItem.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { userId: 'user-1' }
    }))
    expect(result).toHaveLength(1)
  })

  it('addToCart should create new item if not exists', async () => {
    vi.mocked(prisma.cartItem.findFirst).mockResolvedValue(null)

    await addToCart('p1', 2, 'Teal', 'v1')

    expect(prisma.cartItem.create).toHaveBeenCalledWith({
      data: {
        userId: 'user-1',
        productId: 'p1',
        quantity: 2,
        color: 'Teal',
        variant: 'v1',
      }
    })
  })

  it('addToCart should update quantity if item exists', async () => {
    vi.mocked(prisma.cartItem.findFirst).mockResolvedValue({ id: 'existing-1', quantity: 1 } as any)

    await addToCart('p1', 2, 'Teal', 'v1')

    expect(prisma.cartItem.update).toHaveBeenCalledWith({
      where: { id: 'existing-1' },
      data: { quantity: 3 }
    })
  })

  it('removeFromCart should delete item', async () => {
    await removeFromCart('item-1')

    expect(prisma.cartItem.delete).toHaveBeenCalledWith({
      where: { id: 'item-1', userId: 'user-1' }
    })
  })
})
