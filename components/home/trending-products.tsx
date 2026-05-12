"use client"

import * as React from "react"
import { Product } from "@/generated/prisma/client"
import { ProductCard } from "@/components/ui/product-card"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TrendingProductsProps {
  products: Product[]
}

export function TrendingProducts({ products }: TrendingProductsProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: "smooth" })
    }
  }

  if (!products.length) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 overflow-hidden">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
        <SectionHeader
          title="Trending Now"
          badge="Popular Choices"
          description="Pieces our community is loving this week. Highly rated, masterfully crafted, and curated for statement interiors."
          href="/shop?sort=popular"
          className="flex-1"
        />

        {/* Interactive Scroll Controls for Desktop */}
        <div className="hidden md:flex items-center gap-2 pb-1">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            className="h-10 w-10 rounded-full border-border/80 bg-background/50 backdrop-blur-sm hover:bg-secondary hover:text-foreground shadow-xs transition-transform active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            className="h-10 w-10 rounded-full border-border/80 bg-background/50 backdrop-blur-sm hover:bg-secondary hover:text-foreground shadow-xs transition-transform active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Horizontally scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 pt-2 px-1 -mx-1 no-scrollbar [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[260px] sm:w-[300px] lg:w-[320px] shrink-0 snap-start"
          >
            <ProductCard product={product} variant="grid" />
          </div>
        ))}
      </div>
    </section>
  )
}
