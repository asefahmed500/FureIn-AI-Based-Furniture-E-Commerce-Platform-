"use client"

import * as React from "react"
import { type Product } from "@/generated/prisma/client"
import { ProductCard } from "@/components/ui/product-card"
import { Button } from "@/components/ui/button"
import { PackageX, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductGridProps {
  products: Product[]
  viewMode: "grid" | "list"
  onResetFilters?: () => void
  className?: string
}

export function ProductGrid({
  products,
  viewMode,
  onResetFilters,
  className,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center bg-card/50">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-muted-foreground mb-4">
          <PackageX className="h-8 w-8 stroke-[1.5]" />
        </div>
        <h3 className="text-lg font-bold tracking-tight text-foreground">
          No matches found
        </h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-md">
          We couldn&apos;t find any artisanal pieces matching your selected filters. Try broadening your criteria or resetting your selections.
        </p>
        {onResetFilters && (
          <Button
            onClick={onResetFilters}
            className="mt-6 font-bold shadow-xs hover:scale-105 transition-transform"
          >
            <Sparkles className="mr-2 h-4 w-4 text-amber" />
            Clear All Filters
          </Button>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        viewMode === "grid"
          ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          : "flex flex-col gap-6",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant={viewMode}
          className="h-full"
        />
      ))}
    </div>
  )
}
