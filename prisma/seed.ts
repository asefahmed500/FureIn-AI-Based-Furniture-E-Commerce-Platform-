import { PrismaClient } from "@/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"
import bcrypt from "bcryptjs"
import "dotenv/config"

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Clear existing data
  await prisma.wishlistItem.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // Create Admin User
  const adminPassword = await bcrypt.hash("admin123", 12)
  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@furein.com",
      password: adminPassword,
      role: "ADMIN",
    },
  })

  // Create Categories
  const categories = [
    {
      id: "sofas",
      slug: "sofas",
      name: "Sofas & Sectionals",
      description: "Premium handcrafted sofas in rich velvet and natural linen.",
      image: "/products/sofa-sectional-gray.png",
    },
    {
      id: "tables",
      slug: "tables",
      name: "Living & Dining Tables",
      description: "Solid oak and walnut tables designed to anchor your space.",
      image: "/products/table-dining-oak.png",
    },
    {
      id: "chairs",
      slug: "chairs",
      name: "Chairs & Seating",
      description: "Statement accent chairs and incredibly comfortable dining seats.",
      image: "/products/chair-accent-teal.png",
    },
    {
      id: "beds",
      slug: "beds",
      name: "Beds & Bedroom",
      description: "Architectural platform beds for your ultimate sanctuary.",
      image: "/products/bed-platform-walnut.png",
    },
    {
      id: "storage",
      slug: "storage",
      name: "Storage & Media",
      description: "Iconic mid-century credenzas and modular bookshelves.",
      image: "/products/storage-bookshelf-walnut.png",
    },
    {
      id: "lighting",
      slug: "lighting",
      name: "Lighting Fixtures",
      description: "Warm glowing pendants and sculptural desk lamps.",
      image: "/products/lighting-pendant-brass.png",
    },
    {
      id: "decor",
      slug: "decor",
      name: "Curated Décor",
      description: "Artisan ceramics, woven textiles, and statement accessories.",
      image: "/products/decor-ceramic-vases.png",
    },
    {
      id: "outdoor",
      slug: "outdoor",
      name: "Outdoor Living",
      description: "Weather-resistant teak seating and stunning patio sets.",
      image: "/products/outdoor-lounge-chair.png",
    },
  ]

  for (const cat of categories) {
    await prisma.category.create({ data: cat })
  }

  // Create Products
  const products = [
    {
      id: "prod-1",
      slug: "luxury-velvet-accent-chair",
      name: "Aura Velvet Accent Chair",
      description: "Make a statement with the Aura Velvet Accent Chair. Handcrafted with a solid kiln-dried walnut frame, this chair features exceptionally deep seat cushions upholstered in plush, stain-resistant rich velvet.",
      categoryId: "chairs",
      material: "Velvet, Wood",
      price: 649,
      stock: 8,
      images: ["/products/chair-accent-teal.png", "/products/chair-blue.png"],
      dimensions: { width: 32, depth: 34, height: 33, description: "Seat height: 18 inches." },
      variants: [
        { id: "v-walnut", name: "Walnut Legs" },
        { id: "v-oak", name: "Natural Oak Legs" },
      ],
    },
    {
      id: "prod-2",
      slug: "minimalist-slatted-coffee-table",
      name: "Nordic Slatted Oak Coffee Table",
      description: "Anchor your seating arrangement with the pure simplicity of our Nordic Coffee Table. Sculpted from FSC-certified sustainable solid European oak.",
      categoryId: "tables",
      material: "Wood",
      price: 499,
      stock: 15,
      images: ["/products/table-coffee-oak.png", "/products/coffee-table-oak.jpg"],
      dimensions: { width: 48, depth: 24, height: 16 },
      variants: [
        { name: "Natural Oak", hex: "#d4a373" },
        { name: "Smoked Oak", hex: "#7f5539" },
      ],
    },
    {
      id: "prod-3",
      slug: "horizon-fabric-sectional-sofa",
      name: "Horizon Fabric Sectional Sofa",
      description: "Designed for absolute lounging luxury, the Horizon Sectional features extra-deep seating filled with high-resiliency foam wrapped in a plush down-blend duvet.",
      categoryId: "sofas",
      material: "Fabric, Wood",
      price: 2499,
      stock: 4,
      images: ["/products/sofa-sectional-gray.png", "/products/sofa-gray-sectional.png"],
      dimensions: { width: 112, depth: 64, height: 32 },
    },
    {
      id: "prod-4",
      slug: "verona-emerald-velvet-sofa",
      name: "Verona Emerald Velvet Sofa",
      description: "Infuse unparalleled glamour into your home with the Verona Sofa. Tailored in sumptuous emerald green velvet with sleek polished brass stiletto legs.",
      categoryId: "sofas",
      material: "Velvet, Metal",
      price: 1899,
      stock: 2,
      images: ["/products/sofa-velvet-emerald.png"],
      dimensions: { width: 88, depth: 36, height: 31 },
    },
    {
      id: "prod-5",
      slug: "aethel-platform-bed",
      name: "Aethel Platform Bed Frame",
      description: "Transform your bedroom into an architectural retreat. Crafted from solid American walnut with an exquisite natural grain finish.",
      categoryId: "beds",
      material: "Wood, Fabric",
      price: 1299,
      stock: 6,
      images: ["/products/bed-platform-walnut.png"],
      dimensions: { width: 66, depth: 86, height: 42 },
    },
  ]

  for (const prod of products) {
    const { categoryId, ...rest } = prod
    await prisma.product.create({
      data: {
        ...rest,
        category: { connect: { id: categoryId } },
      },
    })
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
