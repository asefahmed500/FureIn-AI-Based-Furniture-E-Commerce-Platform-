"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductWithRelations } from "@/types"
import { ReviewSection } from "./review-section"
import { Check } from "lucide-react"

interface ProductTabsProps {
  product: ProductWithRelations
}

export function ProductTabs({ product }: ProductTabsProps) {
  const materials = product.material ? product.material.split(",").map(m => m.trim()) : []
  const dimensions = product.dimensions as Record<string, string | number> || {}
  
  return (
    <Tabs defaultValue="details" className="w-full">
      <div className="border-b">
        <TabsList className="h-14 w-full justify-start gap-8 bg-transparent p-0">
          <TabsTrigger
            value="details"
            className="relative h-14 rounded-none border-b-2 border-transparent bg-transparent px-2 pb-3 pt-2 text-sm font-black uppercase tracking-widest text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Product Story
          </TabsTrigger>
          <TabsTrigger
            value="specs"
            className="relative h-14 rounded-none border-b-2 border-transparent bg-transparent px-2 pb-3 pt-2 text-sm font-black uppercase tracking-widest text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="shipping"
            className="relative h-14 rounded-none border-b-2 border-transparent bg-transparent px-2 pb-3 pt-2 text-sm font-black uppercase tracking-widest text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Care &amp; Shipping
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="relative h-14 rounded-none border-b-2 border-transparent bg-transparent px-2 pb-3 pt-2 text-sm font-black uppercase tracking-widest text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Reviews ({product.reviewCount})
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="py-10">
        <TabsContent value="details" className="mt-0 outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-black">Crafted with Purpose</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-600 mt-1" />
                  <p className="text-sm font-medium">Sustainably sourced premium {materials.join(", ")} materials.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-600 mt-1" />
                  <p className="text-sm font-medium">Expertly hand-finished for a lifetime of beauty and durability.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-600 mt-1" />
                  <p className="text-sm font-medium">Modern aesthetic that seamlessly blends into contemporary interiors.</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
              <img 
                src={product.images[0]} 
                alt="Product Detail" 
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 border-[20px] border-background/20 m-6" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="specs" className="mt-0 outline-none">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-black mb-8">Technical Dimensions</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 py-4 border-b border-border/50">
                <span className="text-sm font-black uppercase tracking-widest text-muted-foreground">Width</span>
                <span className="text-sm font-bold text-foreground">{dimensions.width || "N/A"}&quot;</span>
              </div>
              <div className="grid grid-cols-2 py-4 border-b border-border/50">
                <span className="text-sm font-black uppercase tracking-widest text-muted-foreground">Depth</span>
                <span className="text-sm font-bold text-foreground">{dimensions.depth || "N/A"}&quot;</span>
              </div>
              <div className="grid grid-cols-2 py-4 border-b border-border/50">
                <span className="text-sm font-black uppercase tracking-widest text-muted-foreground">Height</span>
                <span className="text-sm font-bold text-foreground">{dimensions.height || "N/A"}&quot;</span>
              </div>
              <div className="grid grid-cols-2 py-4 border-b border-border/50">
                <span className="text-sm font-black uppercase tracking-widest text-muted-foreground">Primary Materials</span>
                <span className="text-sm font-bold text-foreground">{materials.join(", ") || "N/A"}</span>
              </div>
              <div className="grid grid-cols-2 py-4 border-b border-border/50">
                <span className="text-sm font-black uppercase tracking-widest text-muted-foreground">Assembly</span>
                <span className="text-sm font-bold text-foreground">White Glove Delivery Included</span>
              </div>
              {dimensions.description && (
                <div className="mt-6 p-4 bg-secondary rounded-xl">
                  <p className="text-xs font-medium text-muted-foreground italic">Note: {dimensions.description}</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shipping" className="mt-0 outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-black uppercase tracking-widest mb-4">Care Instructions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To preserve the integrity and appearance of your FureIn piece, we recommend regular dusting with a soft, lint-free cloth. For wood finishes, use a high-quality furniture wax periodically. For fabrics, professional upholstery cleaning is advised annually.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-widest mb-4">Design Warranty</h3>
                <p className="text-muted-foreground leading-relaxed">
                  FureIn stands behind our craftsmanship. This piece is protected by a 10-year structural frame warranty and a 1-year limited warranty on surface finishes and fabrics.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-black uppercase tracking-widest mb-4">White Glove Delivery</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Most of our architectural furniture pieces qualify for complimentary White Glove Delivery. Our professional handlers will unpack, inspect, and position your item in the desired location, then remove all packaging materials.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-widest mb-4">Returns</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We want you to be absolutely inspired by your purchase. If a design doesn&apos;t harmonize with your space, you may initiate a return within 30 days of delivery. Custom &quot;Made to Order&quot; pieces are final sale.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-0 outline-none">
          <ReviewSection product={product} />
        </TabsContent>
      </div>
    </Tabs>
  )
}
