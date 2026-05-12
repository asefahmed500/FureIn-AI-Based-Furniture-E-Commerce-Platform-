export interface ProductColor {
  name: string
  hex: string
}

export interface ProductDimensions {
  width: number
  depth: number
  height: number
  description?: string
}

export interface ProductVariant {
  id: string
  name: string
  priceDelta?: number
}

export interface ProductReview {
  id: string
  author: string
  avatar?: string
  rating: number
  date: string
  title: string
  comment: string
  image?: string
  isVerified: boolean
}

export interface Product {
  id: string
  slug: string
  title: string
  description: string
  category: "sofas" | "tables" | "chairs" | "beds" | "storage" | "lighting" | "decor" | "outdoor"
  material: string[]
  style: "Modern" | "Scandinavian" | "Industrial" | "Mid-Century" | "Bohemian" | "Minimalist"
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  isNew?: boolean
  isBestSeller?: boolean
  isSale?: boolean
  stockStatus: "In Stock" | "Low Stock" | "Made to Order" | "Out of Stock"
  stockCount: number
  images: string[]
  dimensions: ProductDimensions
  colors: ProductColor[]
  variants?: ProductVariant[]
  reviews?: ProductReview[]
  careInstructions?: string
  warranty?: string
  assemblyRequired?: boolean
}

export interface CategoryItem {
  id: string
  slug: string
  name: string
  description: string
  image: string
  count: number
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: "sofas",
    slug: "sofas",
    name: "Sofas & Sectionals",
    description: "Premium handcrafted sofas in rich velvet and natural linen.",
    image: "/products/sofa-sectional-gray.png",
    count: 24,
  },
  {
    id: "tables",
    slug: "tables",
    name: "Living & Dining Tables",
    description: "Solid oak and walnut tables designed to anchor your space.",
    image: "/products/table-dining-oak.png",
    count: 18,
  },
  {
    id: "chairs",
    slug: "chairs",
    name: "Chairs & Seating",
    description: "Statement accent chairs and incredibly comfortable dining seats.",
    image: "/products/chair-accent-teal.png",
    count: 32,
  },
  {
    id: "beds",
    slug: "beds",
    name: "Beds & Bedroom",
    description: "Architectural platform beds for your ultimate sanctuary.",
    image: "/products/bed-platform-walnut.png",
    count: 12,
  },
  {
    id: "storage",
    slug: "storage",
    name: "Storage & Media",
    description: "Iconic mid-century credenzas and modular bookshelves.",
    image: "/products/storage-bookshelf-walnut.png",
    count: 15,
  },
  {
    id: "lighting",
    slug: "lighting",
    name: "Lighting Fixtures",
    description: "Warm glowing pendants and sculptural desk lamps.",
    image: "/products/lighting-pendant-brass.png",
    count: 20,
  },
  {
    id: "decor",
    slug: "decor",
    name: "Curated Décor",
    description: "Artisan ceramics, woven textiles, and statement accessories.",
    image: "/products/decor-ceramic-vases.png",
    count: 45,
  },
  {
    id: "outdoor",
    slug: "outdoor",
    name: "Outdoor Living",
    description: "Weather-resistant teak seating and stunning patio sets.",
    image: "/products/outdoor-lounge-chair.png",
    count: 14,
  },
]

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    slug: "luxury-velvet-accent-chair",
    title: "Aura Velvet Accent Chair",
    description:
      "Make a statement with the Aura Velvet Accent Chair. Handcrafted with a solid kiln-dried walnut frame, this chair features exceptionally deep seat cushions upholstered in plush, stain-resistant rich velvet. Its subtle mid-century modern lines complement both minimalist and layered interiors perfectly.",
    category: "chairs",
    material: ["Velvet", "Wood"],
    style: "Mid-Century",
    price: 649,
    originalPrice: 799,
    rating: 4.9,
    reviewCount: 42,
    isNew: true,
    isBestSeller: true,
    isSale: true,
    stockStatus: "In Stock",
    stockCount: 8,
    images: [
      "/products/chair-accent-teal.png",
      "/products/chair-blue.png",
    ],
    dimensions: {
      width: 32,
      depth: 34,
      height: 33,
      description: "Seat height: 18 inches. Armrest height: 24 inches.",
    },
    colors: [
      { name: "Deep Teal", hex: "#0f4c5c" },
      { name: "Emerald Green", hex: "#1b4332" },
      { name: "Rich Burgundy", hex: "#590d22" },
      { name: "Warm Off-White", hex: "#e5e5e5" },
    ],
    variants: [
      { id: "v-walnut", name: "Walnut Legs" },
      { id: "v-oak", name: "Natural Oak Legs" },
    ],
    careInstructions:
      "Vacuum regularly with a soft brush attachment. Blot spills immediately with a clean, colorfast towel. Professional dry cleaning recommended for persistent stains.",
    warranty: "10-Year Frame Warranty. 2-Year Cushion & Fabric Warranty.",
    assemblyRequired: false,
    reviews: [
      {
        id: "rev-1",
        author: "Eleanor Vance",
        rating: 5,
        date: "May 2, 2026",
        title: "Stunning color and incredible support",
        comment:
          "Absolutely gorgeous chair! The deep teal velvet catches the sunlight beautifully in our living room. It is quite firm but incredibly comfortable for reading long hours.",
        image: "/products/chair-accent-teal.png",
        isVerified: true,
      },
      {
        id: "rev-2",
        author: "Marcus Aurelius",
        rating: 5,
        date: "April 18, 2026",
        title: "Premium solid wood frame",
        comment:
          "You can tell the walnut legs are authentic and sturdy. Came perfectly packaged with zero assembly needed. Worth every penny.",
        isVerified: true,
      },
    ],
  },
  {
    id: "prod-2",
    slug: "minimalist-slatted-coffee-table",
    title: "Nordic Slatted Oak Coffee Table",
    description:
      "Anchor your seating arrangement with the pure simplicity of our Nordic Coffee Table. Sculpted from FSC-certified sustainable solid European oak, it integrates beautifully rounded edges and an integrated lower slatted storage shelf to keep remote controls and reading materials organized while preserving an airy aesthetic.",
    category: "tables",
    material: ["Wood"],
    style: "Scandinavian",
    price: 499,
    originalPrice: 599,
    rating: 4.8,
    reviewCount: 31,
    isBestSeller: true,
    isSale: true,
    stockStatus: "In Stock",
    stockCount: 15,
    images: [
      "/products/table-coffee-oak.png",
      "/products/coffee-table-oak.jpg",
    ],
    dimensions: {
      width: 48,
      depth: 24,
      height: 16,
      description: "Clearance below shelf: 6 inches. Shelf gap: 5 inches.",
    },
    colors: [
      { name: "Natural Oak", hex: "#d4a373" },
      { name: "Smoked Oak", hex: "#7f5539" },
    ],
    careInstructions:
      "Wipe clean with a soft, damp cloth. Always use coasters for hot or cold beverages to protect the solid wood clear seal lacquer.",
    warranty: "5-Year Solid Wood Structural Warranty.",
    assemblyRequired: true,
    reviews: [
      {
        id: "rev-3",
        author: "Clara Oswald",
        rating: 5,
        date: "May 8, 2026",
        title: "Perfect Scandinavian touch",
        comment:
          "Fits our neutral decor flawlessly. The slatted bottom shelf is perfect for our design books.",
        image: "/products/table-coffee-oak.png",
        isVerified: true,
      },
    ],
  },
  {
    id: "prod-3",
    slug: "luxe-modular-sectional-sofa",
    title: "Horizon Fabric Sectional Sofa",
    description:
      "Designed for absolute lounging luxury, the Horizon Sectional features extra-deep seating filled with high-resiliency foam wrapped in a plush down-blend duvet. Upholstered in premium textured linen weave, its modular configuration allows tailored layout flexibility for hosting family and friends.",
    category: "sofas",
    material: ["Fabric", "Wood"],
    style: "Modern",
    price: 2499,
    rating: 4.9,
    reviewCount: 68,
    isBestSeller: true,
    stockStatus: "In Stock",
    stockCount: 4,
    images: [
      "/products/sofa-sectional-gray.png",
      "/products/sofa-gray-sectional.png",
    ],
    dimensions: {
      width: 112,
      depth: 64,
      height: 32,
      description: "Chaise depth: 64 inches. Seat height: 17 inches.",
    },
    colors: [
      { name: "Heather Gray", hex: "#adb5bd" },
      { name: "Oatmeal Linen", hex: "#e5e5e5" },
      { name: "Charcoal Weave", hex: "#343a40" },
    ],
    variants: [
      { id: "left-chaise", name: "Left-Facing Chaise" },
      { id: "right-chaise", name: "Right-Facing Chaise" },
    ],
    careInstructions: "Cushion covers are removable and machine washable on cold/delicate. Fluff cushions weekly.",
    warranty: "Lifetime Frame Warranty. 5-Year Cushion Foam Resilience Warranty.",
    assemblyRequired: true,
    reviews: [
      {
        id: "rev-4",
        author: "David Rose",
        rating: 5,
        date: "April 29, 2026",
        title: "Like floating on a cloud",
        comment: "This is easily the most comfortable couch I have ever laid upon. The fabric texture feels deeply premium.",
        image: "/products/sofa-sectional-gray.png",
        isVerified: true,
      },
    ],
  },
  {
    id: "prod-4",
    slug: "emerald-velvet-3-seater-sofa",
    title: "Verona Emerald Velvet Sofa",
    description:
      "Infuse unparalleled glamour into your home with the Verona Sofa. Tailored in sumptuous emerald green velvet with sleek polished brass stiletto legs, its bench-style seat cushion ensures pristine uniform support without sagging gaps.",
    category: "sofas",
    material: ["Velvet", "Metal"],
    style: "Modern",
    price: 1899,
    originalPrice: 2199,
    rating: 4.7,
    reviewCount: 19,
    isNew: true,
    isSale: true,
    stockStatus: "Low Stock",
    stockCount: 2,
    images: [
      "/products/sofa-velvet-emerald.png",
      "/products/sofa-gray-sectional.png",
    ],
    dimensions: { width: 88, depth: 36, height: 31 },
    colors: [
      { name: "Emerald Green", hex: "#1b4332" },
      { name: "Sapphire Blue", hex: "#023e8a" },
    ],
    careInstructions: "Brush velvet with the nap to restore luster.",
    warranty: "10-Year Limited Warranty.",
    assemblyRequired: true,
  },
  {
    id: "prod-5",
    slug: "solid-walnut-platform-bed",
    title: "Aethel Platform Bed Frame",
    description:
      "Transform your bedroom into an architectural retreat. Crafted from solid American walnut with an exquisite natural grain finish, this platform bed includes an ergonomically slanted headboard upholstered in tailored stone-colored linen.",
    category: "beds",
    material: ["Wood", "Fabric"],
    style: "Mid-Century",
    price: 1299,
    rating: 4.9,
    reviewCount: 25,
    stockStatus: "In Stock",
    stockCount: 6,
    images: ["/products/bed-platform-walnut.png"],
    dimensions: { width: 66, depth: 86, height: 42, description: "Queen Size. Compatible with all mattress types." },
    colors: [{ name: "Natural Walnut", hex: "#5c3a21" }],
    variants: [
      { id: "size-queen", name: "Queen Size" },
      { id: "size-king", name: "King Size", priceDelta: 200 },
    ],
    careInstructions: "Dust with a dry cloth.",
    warranty: "10-Year Structural Warranty.",
    assemblyRequired: true,
  },
  {
    id: "prod-6",
    slug: "oak-scandinavian-dining-table",
    title: "Soren Oak Dining Table",
    description:
      "Gather in style around the Soren Dining Table. Featuring softly angled solid white oak legs and a durable micro-beveled tabletop, it comfortably seats up to eight guests for vibrant dinner parties.",
    category: "tables",
    material: ["Wood"],
    style: "Scandinavian",
    price: 1099,
    rating: 4.8,
    reviewCount: 14,
    stockStatus: "Made to Order",
    stockCount: 10,
    images: ["/products/table-dining-oak.png"],
    dimensions: { width: 78, depth: 36, height: 30 },
    colors: [{ name: "White Oak", hex: "#e6ccb2" }],
    careInstructions: "Avoid direct placement of intense heat sources.",
    warranty: "5-Year Manufacturer Warranty.",
    assemblyRequired: true,
  },
  {
    id: "prod-7",
    slug: "mid-century-walnut-bookshelf",
    title: "Kava Modular Bookshelf",
    description:
      "Showcase your literature and curated art pieces with the Kava Bookshelf. Constructed with asymmetrical storage compartments in premium walnut veneers, it acts as a standalone geometric art installation.",
    category: "storage",
    material: ["Wood"],
    style: "Mid-Century",
    price: 899,
    rating: 4.6,
    reviewCount: 22,
    isBestSeller: true,
    stockStatus: "In Stock",
    stockCount: 5,
    images: ["/products/storage-bookshelf-walnut.png"],
    dimensions: { width: 40, depth: 14, height: 72 },
    colors: [{ name: "Rich Walnut", hex: "#5c3a21" }],
    careInstructions: "Anchor securely to wall studs to prevent tipping.",
    warranty: "3-Year Limited Warranty.",
    assemblyRequired: true,
  },
  {
    id: "prod-8",
    slug: "brass-dome-pendant-lamp",
    title: "Eclipse Brass Pendant Light",
    description:
      "Cast a warm, ambient glow across your dining or kitchen area. The Eclipse Light features a spun solid brass shade with an interior soft matte white finish to maximize luminous downward distribution.",
    category: "lighting",
    material: ["Metal"],
    style: "Minimalist",
    price: 299,
    originalPrice: 349,
    rating: 4.9,
    reviewCount: 53,
    isSale: true,
    stockStatus: "In Stock",
    stockCount: 20,
    images: ["/products/lighting-pendant-brass.png"],
    dimensions: { width: 18, depth: 18, height: 12, description: "Adjustable hanging cord up to 72 inches." },
    colors: [{ name: "Brushed Brass", hex: "#d4af37" }],
    careInstructions: "Wipe with a clean, dry microfiber cloth. Disconnect power before dusting.",
    warranty: "2-Year Electrical Warranty.",
    assemblyRequired: true,
  },
  {
    id: "prod-9",
    slug: "artisan-sculptural-ceramic-vases",
    title: "Kyoto Sculptural Ceramic Vases (Set of 3)",
    description:
      "Hand-thrown by master artisans, these high-fired stoneware vases introduce unglazed architectural silhouettes and organic matte textures directly to your console table or open floating shelving.",
    category: "decor",
    material: ["Marble"], // Using mapped materials for filtering options
    style: "Minimalist",
    price: 149,
    rating: 4.7,
    reviewCount: 88,
    isNew: true,
    stockStatus: "In Stock",
    stockCount: 30,
    images: ["/products/decor-ceramic-vases.png"],
    dimensions: { width: 8, depth: 8, height: 14, description: "Various complimentary heights in set." },
    colors: [{ name: "Warm Terracotta & Sand", hex: "#e07a5f" }],
    careInstructions: "Watertight interior glazing allows live floral arrangements.",
    warranty: "1-Year Warranty.",
    assemblyRequired: false,
  },
  {
    id: "prod-10",
    slug: "teak-outdoor-lounge-armchair",
    title: "Solstice Teak Outdoor Armchair",
    description:
      "Embrace the warmth of outdoor sunbursts. Engineered from Grade-A sustainable Indonesian teak wood naturally resistant to severe climate rot, fitted with quick-dry core foam cushions wrapped in UV-stable Sunbrella weave.",
    category: "outdoor",
    material: ["Wood", "Fabric"],
    style: "Modern",
    price: 599,
    rating: 4.8,
    reviewCount: 16,
    stockStatus: "In Stock",
    stockCount: 12,
    images: ["/products/outdoor-lounge-chair.png"],
    dimensions: { width: 30, depth: 33, height: 28 },
    colors: [{ name: "Natural Teak & Granite", hex: "#b08968" }],
    careInstructions: "Teak will naturally age to an elegant silvery-gray patina over time if left unsealed.",
    warranty: "5-Year Outdoor Timber Warranty.",
    assemblyRequired: false,
  },
  {
    id: "prod-11",
    slug: "brass-marble-side-table",
    title: "Symmetry Brass & Marble Side Table",
    description:
      "A delicate interplay of substantial solid white Carrara marble base anchored to a slender polished brass post supporting a perfect circular tabletop. Ideal companion beside low-profile seating.",
    category: "tables",
    material: ["Marble", "Metal"],
    style: "Minimalist",
    price: 349,
    originalPrice: 399,
    rating: 4.6,
    reviewCount: 29,
    isSale: true,
    stockStatus: "In Stock",
    stockCount: 18,
    images: ["/products/table-side-brass.png"],
    dimensions: { width: 16, depth: 16, height: 22 },
    colors: [{ name: "Polished Brass & White", hex: "#f8f9fa" }],
    careInstructions: "Clean marble immediately with non-acidic soap to avoid acid-etching.",
    warranty: "2-Year Manufacturer Warranty.",
    assemblyRequired: true,
  },
  // Additional filler products for robust filter states
  {
    id: "prod-12",
    slug: "modern-leather-armchair",
    title: "Oslo Aniline Leather Armchair",
    description: "Premium top-grain buttery cognac leather accent seat draped over a crisp matte black architectural steel sled frame.",
    category: "chairs",
    material: ["Leather", "Metal"],
    style: "Industrial",
    price: 899,
    rating: 4.9,
    reviewCount: 15,
    stockStatus: "Out of Stock",
    stockCount: 0,
    images: ["/products/chair-accent-teal.png"], // Reusing high quality placeholder
    dimensions: { width: 31, depth: 35, height: 30 },
    colors: [{ name: "Cognac Brown", hex: "#9c6644" }],
    careInstructions: "Condition bi-annually with professional leather care cream.",
    warranty: "5-Year Leather Integrity Guarantee.",
    assemblyRequired: false,
  },
]

// Helper functions for static queries
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductsByCategory(cat: string): Product[] {
  return PRODUCTS.filter((p) => p.category === cat)
}

export function getBestSellers(): Product[] {
  return PRODUCTS.filter((p) => p.isBestSeller)
}

export function getTrendingProducts(): Product[] {
  // Taking best rated / highest review counts
  return [...PRODUCTS].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 6)
}

export function getFlashSaleProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isSale).slice(0, 4)
}
