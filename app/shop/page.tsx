import * as React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { ShopClientContent } from "./shop-client-content"
import { getProducts, getCategories } from "@/lib/actions/product"

export const metadata: Metadata = {
  title: "Shop Storefront Catalog",
  description:
    "Explore FureIn's premium collection of handcrafted sofas, dining tables, architectural beds, elegant storage, and curated home décor.",
}

export default async function ShopPage() {
  const [{ products }, categories] = await Promise.all([getProducts(), getCategories()])

  return (
    <div className="min-h-svh flex flex-col bg-background">
      <Navbar />

      {/* Header Interlude Banner */}
      <header className="relative overflow-hidden bg-secondary py-12 sm:py-16 lg:py-20 border-b">
        {/* Ambient Warm Highlights */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-full max-w-7xl bg-gradient-to-r from-amber/5 via-transparent to-amber/5 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          {/* Subtle Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4 flex justify-center text-xs font-semibold text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-bold" aria-current="page">
                Shop
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Architectural Furniture Catalog
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Deliberate materials, uncompromising construction, and harmonious design silhouettes created to elevate your living environments.
          </p>
        </div>
      </header>

      {/* Main Content Area with Client Filter State Wrapped in Suspense */}
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1">
        <React.Suspense
          fallback={
            <div className="flex min-h-[500px] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber border-t-transparent" />
            </div>
          }
        >
          <ShopClientContent initialProducts={products} categories={categories} />
        </React.Suspense>
      </main>
    </div>
  )
}
