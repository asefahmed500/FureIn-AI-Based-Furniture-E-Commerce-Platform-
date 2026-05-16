import { PrismaClient } from "@/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"
import bcrypt from "bcryptjs"
import "dotenv/config"

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Starting seed...")
  // Clear existing data in correct order
  await prisma.wishlistItem.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.review.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // Create Users
  const password = await bcrypt.hash("admin123", 12)
  const userPassword = await bcrypt.hash("user123", 12)

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@furein.com",
      password: password,
      role: "ADMIN",
    },
  })

  const regularUser = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "user@furein.com",
      password: userPassword,
      role: "USER",
    },
  })

  const powerUser = await prisma.user.create({
    data: {
      name: "Sarah Smith",
      email: "sarah@example.com",
      password: userPassword,
      role: "USER",
    },
  })

  // Create Categories
  const categories = [
    { id: "sofas", slug: "sofas", name: "Sofas & Sectionals", description: "Premium sofas.", image: "/products/sofa-sectional-gray.png" },
    { id: "tables", slug: "tables", name: "Living & Dining Tables", description: "Solid wood tables.", image: "/products/table-dining-oak.png" },
    { id: "chairs", slug: "chairs", name: "Chairs & Seating", description: "Comfortable seats.", image: "/products/chair-accent-teal.png" },
    { id: "beds", slug: "beds", name: "Beds & Bedroom", description: "Architectural beds.", image: "/products/bed-platform-walnut.png" },
    { id: "storage", slug: "storage", name: "Storage & Media", description: "Modular storage.", image: "/products/storage-bookshelf-walnut.png" },
    { id: "lighting", slug: "lighting", name: "Lighting", description: "Sculptural lighting.", image: "/products/lighting-pendant-brass.png" },
    { id: "decor", slug: "decor", name: "Curated Décor", description: "Artisan accessories.", image: "/products/decor-ceramic-vases.png" },
    { id: "outdoor", slug: "outdoor", name: "Outdoor Living", description: "Weather-resistant.", image: "/products/outdoor-lounge-chair.png" },
  ]

  for (const cat of categories) {
    await prisma.category.create({ data: cat })
  }

  // Create Products (15 items)
  const productsData = [
    // Sofas
    { id: "prod-1", slug: "aura-velvet-sofa", name: "Aura Velvet Sofa", categoryId: "sofas", price: 1299, stock: 12, material: "Velvet", images: ["/products/sofa-gray-sectional.png"] },
    { id: "prod-2", slug: "horizon-sectional", name: "Horizon Sectional", categoryId: "sofas", price: 2499, stock: 5, material: "Linen", images: ["/products/sofa-sectional-gray.png"] },
    { id: "prod-3", slug: "verona-emerald-sofa", name: "Verona Emerald Sofa", categoryId: "sofas", price: 1899, stock: 3, material: "Velvet", images: ["/products/sofa-velvet-emerald.png"] },
    // Tables
    { id: "prod-4", slug: "nordic-coffee-table", name: "Nordic Coffee Table", categoryId: "tables", price: 499, stock: 20, material: "Oak", images: ["/products/table-coffee-oak.png"] },
    { id: "prod-5", slug: "solid-oak-dining-table", name: "Heritage Dining Table", categoryId: "tables", price: 1599, stock: 8, material: "Oak", images: ["/products/table-dining-oak.png"] },
    { id: "prod-6", slug: "marble-side-table", name: "Luna Marble Side Table", categoryId: "tables", price: 299, stock: 15, material: "Marble", images: ["/products/table-side-marble.png"] },
    // Chairs
    { id: "prod-7", slug: "aura-accent-chair", name: "Aura Accent Chair", categoryId: "chairs", price: 649, stock: 10, material: "Velvet", images: ["/products/chair-accent-teal.png"] },
    { id: "prod-8", slug: "eames-style-lounge", name: "Iconic Lounge Chair", categoryId: "chairs", price: 899, stock: 4, material: "Leather", images: ["/products/chair-blue.png"] },
    { id: "prod-9", slug: "minimalist-dining-chair", name: "Kast Dining Chair", categoryId: "chairs", price: 199, stock: 24, material: "Ash Wood", images: ["/products/chair-dining-ash.png"] },
    // Beds
    { id: "prod-10", slug: "aethel-platform-bed", name: "Aethel Platform Bed", categoryId: "beds", price: 1499, stock: 6, material: "Walnut", images: ["/products/bed-platform-walnut.png"] },
    { id: "prod-11", slug: "mod-upholstered-bed", name: "Mod Upholstered Bed", categoryId: "beds", price: 1199, stock: 9, material: "Fabric", images: ["/products/bed-upholstered-gray.png"] },
    // Storage
    { id: "prod-12", slug: "walnut-credenza", name: "Mid-Century Credenza", categoryId: "storage", price: 1099, stock: 7, material: "Walnut", images: ["/products/storage-credenza-walnut.png"] },
    { id: "prod-13", slug: "modular-bookshelf", name: "Apex Modular Bookshelf", categoryId: "storage", price: 749, stock: 12, material: "Steel/Oak", images: ["/products/storage-bookshelf-walnut.png"] },
    // Lighting
    { id: "prod-14", slug: "brass-pendant-light", name: "Glow Brass Pendant", categoryId: "lighting", price: 349, stock: 18, material: "Brass", images: ["/products/lighting-pendant-brass.png"] },
    // Decor
    { id: "prod-15", slug: "ceramic-vase-set", name: "Artisan Vase Set", categoryId: "decor", price: 89, stock: 30, material: "Ceramic", images: ["/products/decor-ceramic-vases.png"] },
  ]

  for (const p of productsData) {
    const { categoryId, ...rest } = p
    await prisma.product.create({
      data: {
        ...rest,
        description: `This is a premium ${p.name} designed for modern living.`,
        dimensions: { width: 30, depth: 30, height: 30 },
        category: { connect: { id: categoryId } },
      },
    })
  }

  // Create Orders
  const order1 = await prisma.order.create({
    data: {
      userId: regularUser.id,
      total: 1798,
      status: "DELIVERED",
      shippingAddress: { street: "123 Main St", city: "New York", state: "NY", zip: "10001" },
      items: {
        create: [
          { productId: "prod-1", quantity: 1, price: 1299 },
          { productId: "prod-4", quantity: 1, price: 499 },
        ],
      },
    },
  })

  const order2 = await prisma.order.create({
    data: {
      userId: powerUser.id,
      total: 2499,
      status: "SHIPPED",
      shippingAddress: { street: "456 Oak Ave", city: "Los Angeles", state: "CA", zip: "90001" },
      items: {
        create: [
          { productId: "prod-2", quantity: 1, price: 2499 },
        ],
      },
    },
  })

  const order3 = await prisma.order.create({
    data: {
      userId: regularUser.id,
      total: 649,
      status: "PROCESSING",
      shippingAddress: { street: "123 Main St", city: "New York", state: "NY", zip: "10001" },
      items: {
        create: [
          { productId: "prod-7", quantity: 1, price: 649 },
        ],
      },
    },
  })

  const order4 = await prisma.order.create({
    data: {
      userId: powerUser.id,
      total: 388,
      status: "PENDING",
      shippingAddress: { street: "456 Oak Ave", city: "Los Angeles", state: "CA", zip: "90001" },
      items: {
        create: [
          { productId: "prod-14", quantity: 1, price: 349 },
          { productId: "prod-15", quantity: 1, price: 89 },
        ],
      },
    },
  })

  const order5 = await prisma.order.create({
    data: {
      userId: regularUser.id,
      total: 1599,
      status: "CANCELLED",
      shippingAddress: { street: "123 Main St", city: "New York", state: "NY", zip: "10001" },
      items: {
        create: [
          { productId: "prod-5", quantity: 1, price: 1599 },
        ],
      },
    },
  })

  // Create Reviews
  const reviews = [
    { productId: "prod-1", rating: 5, author: "John Doe", title: "Love it!", comment: "Absolutely stunning sofa! The velvet is so soft." },
    { productId: "prod-2", rating: 4, author: "Sarah Smith", title: "Comfortable", comment: "Great sectional, very comfortable but a bit larger than expected." },
    { productId: "prod-4", rating: 5, author: "John Doe", title: "Perfect", comment: "Perfect coffee table for my living room." },
    { productId: "prod-7", rating: 5, author: "Sarah Smith", title: "Amazing color", comment: "Love the color of this chair!" },
    { productId: "prod-10", rating: 3, author: "John Doe", title: "Difficult assembly", comment: "Assembly was a bit difficult." },
    { productId: "prod-14", rating: 5, author: "Sarah Smith", title: "Beautiful", comment: "Beautiful light fixture." },
    { productId: "prod-15", rating: 4, author: "John Doe", title: "Nice", comment: "Cute vases, well packed." },
    { productId: "prod-5", rating: 5, author: "Sarah Smith", title: "Sturdy", comment: "Solid oak table, built to last." },
    { productId: "prod-9", rating: 4, author: "John Doe", title: "Elegant", comment: "Simple and elegant." },
    { productId: "prod-12", rating: 5, author: "Sarah Smith", title: "Gorgeous", comment: "The walnut finish is gorgeous." },
  ]

  for (const r of reviews) {
    await prisma.review.create({ data: r })
  }


  console.log("Seeding completed successfully.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })

