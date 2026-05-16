import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RegisterForm } from '@/components/auth/register-form'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { signup } from '@/lib/actions/auth'
import { signIn } from 'next-auth/react'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// Mock lib/actions/auth
vi.mock('@/lib/actions/auth', () => ({
  signup: vi.fn(),
}))

// Mock next-auth/react
vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
}))

describe('RegisterForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all form fields', () => {
    render(<RegisterForm />)
    expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    render(<RegisterForm />)
    const submitButton = screen.getByRole('button', { name: /Create Account/i })
    
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/Invalid architectural address/i)).toBeInTheDocument()
      expect(screen.getByText(/Security protocol requires 8\+ characters/i)).toBeInTheDocument()
    })
  })

  it('calls signup and signIn on successful submission', async () => {
    vi.mocked(signup).mockResolvedValue({ success: true })
    vi.mocked(signIn).mockResolvedValue({ error: null, status: 200, ok: true, url: null })

    render(<RegisterForm />)
    
    fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'password123' } })
    
    fireEvent.click(screen.getByRole('checkbox'))

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }))

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      })
      expect(signIn).toHaveBeenCalledWith('credentials', expect.any(Object))
    })
  })
})
