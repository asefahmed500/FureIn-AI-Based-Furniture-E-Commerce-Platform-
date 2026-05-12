"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List, SlidersHorizontal, ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SortControlsProps {
  totalCount: number
  sortBy: string
  setSortBy: (sort: string) => void
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
  onToggleMobileFilters: () => void
  className?: string
}

export function SortControls({
  totalCount,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onToggleMobileFilters,
  className,
}: SortControlsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between shadow-2xs",
        className
      )}
    >
      {/* Left side: Results Count & Mobile Filter Button */}
      <div className="flex items-center justify-between gap-4 sm:justify-start">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleMobileFilters}
          className="flex lg:hidden font-bold border-border"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4 text-primary" />
          Filters
        </Button>

        <p className="text-xs font-semibold text-muted-foreground sm:text-sm">
          Showing <span className="font-extrabold text-foreground">{totalCount}</span> artisanal piece{totalCount === 1 ? "" : "s"}
        </p>
      </div>

      {/* Right side: Sort Selector & Grid/List View Modes */}
      <div className="flex items-center justify-between gap-4 sm:justify-end">
        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="plp-sort" className="text-xs font-bold text-muted-foreground uppercase tracking-wider hidden sm:inline">
            Sort by:
          </label>
          <div className="relative">
            <select
              id="plp-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 cursor-pointer appearance-none rounded-lg border border-border/80 bg-background pl-3 pr-8 text-xs font-bold text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 shadow-2xs"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ArrowUpDown className="absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 pointer-events-none text-muted-foreground" />
          </div>
        </div>

        {/* Separator */}
        <div className="h-4 w-[1px] bg-border hidden sm:block" />

        {/* View Layout Switcher */}
        <div className="flex items-center gap-1 rounded-lg border bg-background p-0.5">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md transition-all",
              viewMode === "grid"
                ? "bg-secondary text-primary font-bold shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Grid View"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md transition-all",
              viewMode === "list"
                ? "bg-secondary text-primary font-bold shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="List View"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
