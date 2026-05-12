"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Check, SlidersHorizontal, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { CategoryWithCount } from "@/types"

interface FilterSidebarProps {
  categories: CategoryWithCount[]
  selectedCategory: string | null
  setSelectedCategory: (cat: string | null) => void
  selectedMaterials: string[]
  setSelectedMaterials: (materials: string[]) => void
  maxPrice: number
  setMaxPrice: (price: number) => void
  inStockOnly: boolean
  setInStockOnly: (val: boolean) => void
  onClearAll: () => void
  className?: string
}

const MATERIALS = ["Velvet", "Wood", "Fabric", "Metal", "Marble", "Leather"]

export function FilterSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedMaterials,
  setSelectedMaterials,
  maxPrice,
  setMaxPrice,
  inStockOnly,
  setInStockOnly,
  onClearAll,
  className,
}: FilterSidebarProps) {
  const toggleMaterial = (mat: string) => {
    if (selectedMaterials.includes(mat)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== mat))
    } else {
      setSelectedMaterials([...selectedMaterials, mat])
    }
  }

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    selectedMaterials.length +
    (maxPrice < 3000 ? 1 : 0) +
    (inStockOnly ? 1 : 0)

  return (
    <aside className={cn("flex flex-col gap-6 rounded-2xl border bg-card p-6 shadow-xs", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <h2 className="font-bold tracking-tight text-foreground">Filters</h2>
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber text-[10px] font-black text-white">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-auto p-1 text-xs font-semibold text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="mr-1 h-3 w-3" />
            Reset
          </Button>
        )}
      </div>

      {/* Categories Filter */}
      <div className="flex flex-col gap-3 border-b pb-5">
        <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
          Category
        </h3>
        <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-secondary/60 text-left",
              !selectedCategory || selectedCategory === "all" ? "bg-secondary text-primary font-bold" : "text-muted-foreground"
            )}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.slug
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-secondary/60 text-left",
                  isActive ? "bg-secondary text-primary font-bold" : "text-muted-foreground"
                )}
              >
                <span className="truncate">{cat.name}</span>
                <span className="text-[11px] opacity-60">({cat._count?.products || 0})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="flex flex-col gap-3 border-b pb-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
            Max Price
          </h3>
          <span className="text-sm font-extrabold text-foreground">${maxPrice}</span>
        </div>
        <input
          type="range"
          min={100}
          max={3000}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-amber"
          aria-label="Max Price Range Slider"
        />
        <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
          <span>$100</span>
          <span>$3,000</span>
        </div>
      </div>

      {/* Materials Filter */}
      <div className="flex flex-col gap-3 border-b pb-5">
        <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
          Materials
        </h3>
        <div className="flex flex-wrap gap-2">
          {MATERIALS.map((mat) => {
            const isSelected = selectedMaterials.includes(mat)
            return (
              <button
                key={mat}
                type="button"
                onClick={() => toggleMaterial(mat)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground font-bold shadow-2xs"
                    : "border-border/60 bg-background text-muted-foreground hover:border-border"
                )}
              >
                {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                {mat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
          Availability
        </h3>
        <div className="flex flex-col gap-2">
          <label className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1 transition-colors hover:bg-secondary/40">
            <span className={cn("text-sm font-medium", inStockOnly ? "text-foreground font-bold" : "text-muted-foreground")}>
              In Stock Only
            </span>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary accent-amber focus:ring-primary/20"
            />
          </label>
        </div>
      </div>
    </aside>
  )
}
