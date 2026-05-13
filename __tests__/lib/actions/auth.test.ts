import { signup } from '@/lib/actions/auth'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/prisma', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}))

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
  },
}))

describe('signup action', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return error if validation fails', async () => {
    const result = await signup({
      name: 'A',
      email: 'invalid-email',
      password: 'short',
    })

    expect(result.error).toBeDefined()
    expect(result.error).toHaveProperty('name')
    expect(result.error).toHaveProperty('email')
    expect(result.error).toHaveProperty('password')
  })

  it('should return error if user already exists', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: '1', email: 'test@example.com' } as any)

    const result = await signup({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    })

    expect(result.error).toEqual({ email: ['User with this email already exists'] })
  })

  it('should hash password and create user if validation passes', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null)
    vi.mocked(bcrypt.hash).mockResolvedValue('hashed-password' as never)
    vi.mocked(prisma.user.create).mockResolvedValue({ id: '1' } as any)

    const result = await signup({
      name: 'Test User',
      email: 'new@example.com',
      password: 'password123',
    })

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12)
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'Test User',
        email: 'new@example.com',
        password: 'hashed-password',
      },
    })
    expect(result.success).toBe(true)
  })
})
