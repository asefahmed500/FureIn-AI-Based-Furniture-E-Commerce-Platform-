import * as React from "react"
import { Product } from "@/generated/prisma/client"
import { ProductCard } from "@/components/ui/product-card"
import { SectionHeader } from "@/components/ui/section-header"

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) return null

  return (
    <section>
      <SectionHeader 
        title="Complete The Environment" 
        description="Sustainably curated designs that harmonize perfectly with your selection."
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
