"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const WISHLIST_ITEMS = [
  {
    id: "p1",
    name: "VELVET MONOLITH",
    category: "LIVING",
    price: 3499,
    image: "/products/velvet-sofa.png",
    status: "In Stock"
  },
  {
    id: "p4",
    name: "PRISM PENDANT",
    category: "LIGHTING",
    price: 899,
    image: "/products/pendant-lamp.png",
    status: "Limited Supply"
  }
]

export default function WishlistPage() {
  const [items, setItems] = React.useState(WISHLIST_ITEMS)

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight">Curated Vault</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
            Your collection of architectural desires and future acquisitions.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/10 border border-border/50">
          <Heart className="h-4 w-4 text-primary fill-primary" />
          <span className="text-xs font-black uppercase tracking-widest">{items.length} ARCHIVED PIECES</span>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="group relative flex flex-col rounded-2xl bg-white border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary/10">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="outline" className="bg-white/90 backdrop-blur-md border-0 text-[10px] font-black tracking-tighter px-3 h-6 flex items-center">
                    {item.category}
                  </Badge>
                </div>
                <Button 
                  onClick={() => removeItem(item.id)}
                  size="icon" 
                  variant="secondary" 
                  className="absolute top-4 right-4 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-6 space-y-4 flex-grow">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black tracking-tight uppercase tracking-[0.1em]">{item.name}</h3>
                    <p className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
                      {item.status === "In Stock" ? (
                        <span className="text-emerald-500 flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-emerald-500" /> AVAILABLE FOR DISPATCH
                        </span>
                      ) : (
                        <span className="text-amber-500 flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-amber-500" /> LIMITED PRESERVATION
                        </span>
                      )}
                    </p>
                  </div>
                  <p className="text-lg font-black tracking-tighter">${item.price}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button asChild variant="outline" className="h-12 rounded-xl border-2 font-black uppercase tracking-widest text-[10px]">
                    <Link href={`/product/${item.id}`}>Details</Link>
                  </Button>
                  <Button className="h-12 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add More Inspiration Card */}
          <Link href="/shop" className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/50 p-12 text-center space-y-6 hover:border-primary/50 transition-colors duration-500">
            <div className="h-20 w-20 rounded-full bg-secondary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <ShoppingBag className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="space-y-2">
              <h4 className="font-black uppercase tracking-[0.2em]">Add Pieces</h4>
              <p className="text-xs font-medium text-muted-foreground">Continue exploring our architectural collections.</p>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 space-y-8 text-center border-2 border-dashed border-border/50 rounded-3xl">
          <div className="h-32 w-32 rounded-full bg-secondary/5 flex items-center justify-center">
            <Heart className="h-16 w-16 text-muted-foreground/20" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-[0.2em]">Vault Empty</h2>
            <p className="text-muted-foreground font-medium max-w-[400px]">You haven&apos;t archived any pieces yet. Start curating your architectural vision.</p>
          </div>
          <Button asChild size="lg" className="h-16 rounded-2xl px-12 font-black uppercase tracking-widest text-lg shadow-xl shadow-primary/20">
            <Link href="/shop">Start Curating</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
