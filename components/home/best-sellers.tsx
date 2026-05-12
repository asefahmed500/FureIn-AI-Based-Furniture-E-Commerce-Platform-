"use client"

import * as React from "react"
import { Product } from "@/generated/prisma/client"
import { ProductCard } from "@/components/ui/product-card"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List } from "lucide-react"

interface BestSellersProps {
  products: Product[]
}

export function BestSellers({ products }: BestSellersProps) {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")

  if (!products.length) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
        <SectionHeader
          title="Best Sellers"
          badge="Timeless Favorites"
          description="Our most coveted items, consistently top-rated by verified customers for their comfort, enduring style, and exquisite finishes."
          href="/shop?sort=bestselling"
          className="flex-1"
        />

        {/* View mode toggle controls */}
        <div className="flex items-center gap-1.5 self-start md:self-auto bg-secondary/80 p-1 rounded-lg border border-border/60">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-8 px-2.5 text-xs font-bold rounded-md shadow-none"
            aria-label="Grid view"
          >
            <LayoutGrid className="h-3.5 w-3.5 mr-1" />
            Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="h-8 px-2.5 text-xs font-bold rounded-md shadow-none"
            aria-label="List view"
          >
            <List className="h-3.5 w-3.5 mr-1" />
            List
          </Button>
        </div>
      </div>

      {/* Render layout based on viewMode */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} variant="grid" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} variant="list" />
          ))}
        </div>
      )}
    </section>
  )
}
