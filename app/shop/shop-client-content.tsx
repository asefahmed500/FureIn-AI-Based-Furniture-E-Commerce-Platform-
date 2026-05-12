"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { FilterSidebar } from "@/components/shop/filter-sidebar"
import { ProductGrid } from "@/components/shop/product-grid"
import { SortControls } from "@/components/shop/sort-controls"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, SlidersHorizontal } from "lucide-react"

import { type Product, type Category } from "@/generated/prisma/client"

interface ShopClientContentProps {
  initialProducts: (Product & { category: Category })[]
  categories: (Category & { _count: { products: number } })[]
  categorySlugOverride?: string
}

export function ShopClientContent({ 
  initialProducts, 
  categories, 
  categorySlugOverride 
}: ShopClientContentProps) {
  const searchParams = useSearchParams()
  const initialCategory = categorySlugOverride || searchParams.get("category")

  // State Management
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    initialCategory || null
  )
  const [selectedMaterials, setSelectedMaterials] = React.useState<string[]>([])
  const [maxPrice, setMaxPrice] = React.useState<number>(3000)
  const [inStockOnly, setInStockOnly] = React.useState<boolean>(false)
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [sortBy, setSortBy] = React.useState<string>("featured")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState<boolean>(false)

  // Sync state if URL query changes dynamically or override changes
  React.useEffect(() => {
    if (categorySlugOverride) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCategory(categorySlugOverride)
    } else {
      const catParam = searchParams.get("category")
      if (catParam) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedCategory(catParam)
      }
    }
  }, [categorySlugOverride, searchParams])

  // Clear all helper
  const handleClearAllFilters = () => {
    setSelectedCategory(null)
    setSelectedMaterials([])
    setMaxPrice(3000)
    setInStockOnly(false)
    setSearchQuery("")
  }

  // Filter & Sort Logic
  const filteredProducts = React.useMemo(() => {
    return initialProducts.filter((p) => {
      // Category Match
      if (selectedCategory && selectedCategory !== "all") {
        // Check if category slug matches
        if (p.category?.slug !== selectedCategory) return false
      }

      // Max Price Match
      if (p.price > maxPrice) return false

      // Stock Status
      if (inStockOnly && p.stock === 0) return false

      // Materials Filter
      if (selectedMaterials.length > 0) {
        const hasMatch = selectedMaterials.some(m => p.material?.includes(m))
        if (!hasMatch) return false
      }

      // Live Text Search
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase()
        const titleMatch = p.name.toLowerCase().includes(query)
        const descMatch = p.description.toLowerCase().includes(query)
        if (!titleMatch && !descMatch) return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      // Default: featured
      return 0
    })
  }, [
    initialProducts,
    selectedCategory,
    selectedMaterials,
    maxPrice,
    inStockOnly,
    searchQuery,
    sortBy,
  ])

  // Helper to map category slug to title for chips
  const categoryTitle = React.useMemo(() => {
    if (!selectedCategory) return null
    const found = categories.find((c) => c.slug === selectedCategory)
    return found ? found.name : selectedCategory
  }, [selectedCategory, categories])

  const hasActiveFilters =
    selectedCategory !== null ||
    selectedMaterials.length > 0 ||
    maxPrice < 3000 ||
    inStockOnly ||
    searchQuery.trim() !== ""

  return (
    <div className="flex flex-col gap-6">
      {/* Search Input Bar & Active Filter Chips Container */}
      <div className="flex flex-col gap-3">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl bg-card border-border/80 text-sm focus-visible:ring-primary/20 shadow-2xs"
            aria-label="Search Catalog"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-secondary transition-colors"
              aria-label="Clear Search"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-bold text-muted-foreground mr-1">Active filters:</span>
            {categoryTitle && (
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary text-primary font-bold px-2.5 py-1">
                Category: {categoryTitle}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="hover:text-destructive transition-colors ml-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {maxPrice < 3000 && (
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary text-primary font-bold px-2.5 py-1">
                Up to ${maxPrice}
                <button
                  onClick={() => setMaxPrice(3000)}
                  className="hover:text-destructive transition-colors ml-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary text-primary font-bold px-2.5 py-1">
                In Stock
                <button
                  onClick={() => setInStockOnly(false)}
                  className="hover:text-destructive transition-colors ml-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button
              onClick={handleClearAllFilters}
              className="text-muted-foreground hover:text-destructive underline font-semibold ml-2"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      <div className="flex items-start gap-8">
        <div className="hidden lg:block w-64 shrink-0 sticky top-24">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedMaterials={selectedMaterials}
            setSelectedMaterials={setSelectedMaterials}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            onClearAll={handleClearAllFilters}
          />
        </div>

        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <SortControls
            totalCount={filteredProducts.length}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            onToggleMobileFilters={() => setIsMobileFilterOpen(true)}
          />

          <ProductGrid
            products={filteredProducts}
            viewMode={viewMode}
            onResetFilters={hasActiveFilters ? handleClearAllFilters : undefined}
          />
        </div>
      </div>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-background p-6 shadow-xl z-10 animate-slide-left">
            <div className="flex items-center justify-between pb-4 border-b mb-4">
              <span className="font-bold">Filters</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileFilterOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <FilterSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedMaterials={selectedMaterials}
                setSelectedMaterials={setSelectedMaterials}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                onClearAll={handleClearAllFilters}
              />
            </div>
            <div className="mt-6 pt-4 border-t sticky bottom-0 bg-background">
              <Button className="w-full font-bold h-11" onClick={() => setIsMobileFilterOpen(false)}>
                Apply Filters ({filteredProducts.length})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
