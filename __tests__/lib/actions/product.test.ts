import { getProducts, getProductBySlug, getCategories } from '@/lib/actions/product'
import prisma from '@/lib/prisma'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/prisma', () => ({
  default: {
    product: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
    category: {
      findMany: vi.fn(),
    },
  },
}))

describe('product actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getProducts should fetch products with filters', async () => {
    vi.mocked(prisma.product.findMany).mockResolvedValue([{ id: '1', name: 'Chair' }] as any)

    const result = await getProducts({ category: 'chairs' })

    expect(prisma.product.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        category: { slug: 'chairs' }
      })
    }))
    expect(result).toHaveLength(1)
  })

  it('getProductBySlug should fetch a single product', async () => {
    vi.mocked(prisma.product.findUnique).mockResolvedValue({ id: '1', name: 'Chair', slug: 'chair' } as any)

    const result = await getProductBySlug('chair')

    expect(prisma.product.findUnique).toHaveBeenCalledWith(expect.objectContaining({
      where: { slug: 'chair' }
    }))
    expect(result?.name).toBe('Chair')
  })

  it('getCategories should fetch all categories', async () => {
    vi.mocked(prisma.category.findMany).mockResolvedValue([{ id: '1', name: 'Seating' }] as any)

    const result = await getCategories()

    expect(prisma.category.findMany).toHaveBeenCalled()
    expect(result).toHaveLength(1)
  })
})
