import * as React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { getProducts, getCategories } from "@/lib/actions/product"
import { ShopClientContent } from "../shop-client-content"

interface CategoryShopPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateMetadata({ params }: CategoryShopPageProps): Promise<Metadata> {
  const { category: slug } = await params
  const categories = await getCategories()
  const category = categories.find((c) => c.slug === slug)
  
  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${category.name} | FureIn Store`,
    description: category.description || `Explore our ${category.name} collection.`,
  }
}

export default async function CategoryShopPage({ params }: CategoryShopPageProps) {
  const { category: slug } = await params
  const [{ products }, categories] = await Promise.all([getProducts(), getCategories()])
  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-svh flex flex-col bg-background">
      <Navbar />

      {/* Category Header */}
      <header className="relative overflow-hidden bg-secondary py-12 sm:py-16 lg:py-20 border-b">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-full max-w-7xl bg-gradient-to-r from-amber/5 via-transparent to-amber/5 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 flex justify-center text-xs font-semibold text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/shop" className="hover:text-primary transition-colors">
                  Shop
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-bold" aria-current="page">
                {category.name}
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {category.name}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {category.description}
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1">
        <React.Suspense
          fallback={
            <div className="flex min-h-[500px] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber border-t-transparent" />
            </div>
          }
        >
          <ShopClientContent 
            initialProducts={products} 
            categories={categories} 
            categorySlugOverride={slug} 
          />
        </React.Suspense>
      </main>
    </div>
  )
}
