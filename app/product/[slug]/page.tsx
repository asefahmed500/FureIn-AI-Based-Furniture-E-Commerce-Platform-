import * as React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { getProductBySlug, getProducts } from "@/lib/actions/product"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductInfo } from "@/components/product/product-info"
import { ProductTabs } from "@/components/product/product-tabs"
import { RelatedProducts } from "@/components/product/related-products"
import { ProductWithRelations } from "@/types"
import { Product } from "@/generated/prisma/client"

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  
  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${product.name} | FureIn Store`,
    description: product.description,
    openGraph: {
      images: [product.images[0]],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  // Fetch related products (same category)
  const { products: relatedProducts } = await getProducts({ category: product.category.slug })
  const filteredRelated = relatedProducts
    .filter(p => p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-svh flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumbs - Inline for product context */}
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
              </li>
              <li>/</li>
              <li>
                <Link href={`/shop/${product.category.slug}`} className="capitalize hover:text-primary transition-colors">
                  {product.category.name}
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-bold" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          {/* Main Product Section: Gallery + Info */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
            <ProductGallery images={product.images} title={product.name} />
            <ProductInfo product={product as ProductWithRelations} />
          </div>

          {/* Detailed Information Tabs */}
          <div className="mt-20">
            <ProductTabs product={product as ProductWithRelations} />
          </div>

          {/* Related Products Section */}
          <div className="mt-24 pb-16">
            <RelatedProducts products={filteredRelated as Product[]} />
          </div>
        </div>
      </main>
    </div>
  )
}
