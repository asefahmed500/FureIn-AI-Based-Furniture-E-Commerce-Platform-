import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Category } from "@/generated/prisma/client"
import { SectionHeader } from "@/components/ui/section-header"

interface FeaturedCategoriesProps {
  categories: (Category & { _count: { products: number } })[]
}

export function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <SectionHeader
        title="Shop by Category"
        badge="Curated Collections"
        description="Explore beautifully organized furniture collections crafted to elevate every room in your personal sanctuary."
        className="mb-8"
      />

      {/* Grid Layout: 2 columns mobile, 4 columns desktop */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/shop/${category.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-secondary/40 aspect-[4/5] border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* Background Image */}
            <Image
              src={category.image || "/products/chair-accent-teal.png"}
              alt={category.name}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Premium Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
            <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Content overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4 sm:p-5 text-white z-10">
              <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-amber uppercase drop-shadow-sm">
                {category._count.products} Items
              </span>
              <h3 className="mt-0.5 text-base sm:text-lg font-bold tracking-tight text-white drop-shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
                {category.name}
              </h3>
              <p className="mt-1 text-xs text-white/80 line-clamp-2 opacity-0 transition-all duration-300 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hidden sm:block">
                {category.description}
              </p>
            </div>

            {/* Subtle glow edge on hover */}
            <div className="absolute inset-0 border border-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl pointer-events-none" />
          </Link>
        ))}
      </div>
    </section>
  )
}
