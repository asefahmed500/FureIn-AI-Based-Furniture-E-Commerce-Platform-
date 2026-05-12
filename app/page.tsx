import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedCategories } from "@/components/home/featured-categories"
import { FlashSale } from "@/components/home/flash-sale"
import { TrendingProducts } from "@/components/home/trending-products"
import { PromoBanner } from "@/components/home/promo-banner"
import { BestSellers } from "@/components/home/best-sellers"
import { CustomerReviews } from "@/components/home/customer-reviews"
import { BrandLogos } from "@/components/home/brand-logos"
import { Newsletter } from "@/components/home/newsletter"
import { 
  getTrendingProducts, 
  getFlashSaleProducts, 
  getBestSellers,
  getCategories
} from "@/lib/actions/product"

export default async function HomePage() {
  // Fetch all data in parallel for optimal performance
  const [trending, flashSale, bestSellers, categories] = await Promise.all([
    getTrendingProducts(),
    getFlashSaleProducts(),
    getBestSellers(),
    getCategories()
  ])

  return (
    <div className="min-h-svh flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Stack */}
        <HeroSection />

        {/* Brand Recognition / Trust Indicators */}
        <BrandLogos />

        {/* Featured Lifestyle Categories Grid */}
        <FeaturedCategories categories={categories} />

        {/* Limited Time Flash Deals with Active Countdowns */}
        <FlashSale products={flashSale} />

        {/* Horizontally Snap-Scrolling Trending Recommendations */}
        <TrendingProducts products={trending} />

        {/* Customization & White-Glove Interlude Banner */}
        <PromoBanner />

        {/* Master Catalog Best Sellers with Interactive Grid/List layouts */}
        <BestSellers products={bestSellers} />

        {/* Verified Community Experience Testimonials Stack */}
        <CustomerReviews />

        {/* Exclusive Studio Priority Pass Callout */}
        <Newsletter />
      </main>
    </div>
  )
}
