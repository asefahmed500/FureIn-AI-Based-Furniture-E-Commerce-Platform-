"use server"

import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const SignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Security protocol requires 8+ characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a digit"),
})

export async function signup(formData: z.infer<typeof SignupSchema>) {
  try {
    const validatedFields = SignupSchema.safeParse(formData)

    if (!validatedFields.success) {
      return { error: validatedFields.error.flatten().fieldErrors }
    }

    const { name, email, password } = validatedFields.data
    const normalizedEmail = email.toLowerCase().trim()

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    })

    if (existingUser) {
      return { error: { email: ["User with this email already exists"] } }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Signup error:", error)
    return { error: "Something went wrong. Please try again." }
  }
}
