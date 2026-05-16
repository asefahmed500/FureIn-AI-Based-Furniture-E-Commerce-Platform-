"use client"

import * as React from "react"
import { ShoppingCart, Heart, Share2, Ruler, ShieldCheck, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/star-rating"
import { QuantityStepper } from "@/components/ui/quantity-stepper"
import { ProductWithRelations } from "@/types"
import { Product } from "@/generated/prisma/client"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useCartStore, ProductVariant, ProductColor } from "@/lib/store"
import { useSession } from "next-auth/react"
import { addToCart } from "@/lib/actions/cart"
import { toggleWishlist } from "@/lib/actions/user"
import { useRouter } from "next/navigation"

interface ProductInfoProps {
  product: ProductWithRelations
}

export function ProductInfo({ product }: ProductInfoProps) {
  const colors = (product.colors as unknown as ProductColor[]) || []
  const variants = (product.variants as unknown as ProductVariant[]) || []
  
  const { data: session } = useSession()
  const router = useRouter()
  const [isAdding, setIsAdding] = React.useState(false)
  const [isWishlisting, setIsWishlisting] = React.useState(false)
  const [selectedColor, setSelectedColor] = React.useState(colors[0]?.name || "")
  const [selectedVariant, setSelectedVariant] = React.useState(variants[0]?.id || "")
  const [quantity, setQuantity] = React.useState(1)
  const addItem = useCartStore((state) => state.addItem)

  const currentPrice = React.useMemo(() => {
    let price = Number(product.price)
    if (selectedVariant && variants.length > 0) {
      const variant = variants.find(v => v.id === selectedVariant)
      if (variant?.priceDelta) {
        price += variant.priceDelta
      }
    }
    return price
  }, [product.price, variants, selectedVariant])

  const stockStatus = React.useMemo(() => {
    if (product.stock <= 0) return "Out of Stock"
    if (product.stock <= 5) return "Low Stock"
    return "In Stock"
  }, [product.stock])

  const handleAddToWishlist = async () => {
    if (!session) {
      toast.error("Please sign in to add items to your wishlist")
      return
    }
    setIsWishlisting(true)
    try {
      const result = await toggleWishlist(product.id)
      if (result.success) {
        toast.success(result.action === "added" ? "Added to wishlist" : "Removed from wishlist")
      } else {
        toast.error(result.error || "Failed to update wishlist")
      }
    } catch {
      toast.error("An error occurred")
    } finally {
      setIsWishlisting(false)
    }
  }

  const handleAddToCart = async () => {
    if (session) {
      setIsAdding(true)
      try {
        const result = await addToCart(product.id, quantity, selectedColor, selectedVariant)
        if (result.success) {
          toast.success(`Added ${quantity} x ${product.name} to your collection.`, {
            description: `Color: ${selectedColor}${selectedVariant ? `, Type: ${variants.find(v => v.id === selectedVariant)?.name}` : ""}`,
            action: {
              label: "View Cart",
              onClick: () => router.push("/cart"),
            },
          })
          router.refresh()
        } else {
          toast.error(result.error || "Bag integration failed")
        }
      } catch {
        toast.error("Structural protocol failure")
      } finally {
        setIsAdding(false)
      }
    } else {
      addItem(product as unknown as Product, quantity, selectedColor, selectedVariant)
      toast.success(`Added ${quantity} x ${product.name} to your collection.`, {
        description: `Color: ${selectedColor}${selectedVariant ? `, Type: ${variants.find(v => v.id === selectedVariant)?.name}` : ""}`,
        action: {
          label: "View Cart",
          onClick: () => router.push("/cart"),
        },
      })
    }
  }

  return (
    <div className="flex flex-col">
      {/* Header Info */}
      <div className="flex flex-col gap-2 border-b pb-6">
        <div className="flex items-center gap-2">
          {product.isNew && (
            <Badge className="bg-amber text-amber-foreground hover:bg-amber/90 font-bold px-3">NEW ARRIVAL</Badge>
          )}
          {product.isSale && (
            <Badge variant="destructive" className="font-bold px-3">LIMITED SALE</Badge>
          )}
        </div>
        
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          {product.name}
        </h1>

        <div className="flex items-center gap-4 mt-1">
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} size="sm" />
            <span className="text-sm font-bold">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground font-medium underline underline-offset-4 cursor-pointer hover:text-primary transition-colors">
            {product.reviewCount} Design Reviews
          </span>
          <span className="text-sm text-muted-foreground font-medium">|</span>
          <span className={cn(
            "text-sm font-bold uppercase tracking-wider",
            stockStatus === "In Stock" ? "text-emerald-600" : "text-amber-600"
          )}>
            {stockStatus}
          </span>
        </div>

        <div className="flex items-baseline gap-3 mt-4">
          <span className="text-3xl font-black text-primary">${currentPrice}</span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through font-medium">
              ${Number(product.originalPrice)}
            </span>
          )}
        </div>
      </div>

      <div className="py-8 space-y-8 border-b">
        {/* Color Selection */}
        {colors.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                Finish / Color: <span className="text-foreground">{selectedColor}</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={cn(
                    "group relative h-10 w-10 rounded-full border-2 transition-all p-0.5",
                    selectedColor === color.name ? "border-primary" : "border-transparent hover:border-border"
                  )}
                  title={color.name}
                >
                  <div 
                    className="h-full w-full rounded-full shadow-inner" 
                    style={{ backgroundColor: color.value }} 
                  />
                  {selectedColor === color.name && (
                    <div className="absolute -inset-2 rounded-full border border-primary/20 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Variant Selection (e.g., Size or Material type) */}
        {variants.length > 0 && (
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
              Configuration Option
            </span>
            <div className="grid grid-cols-2 gap-3">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant.id)}
                  className={cn(
                    "flex flex-col items-start gap-1 rounded-xl border-2 p-3 text-left transition-all",
                    selectedVariant === variant.id 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <span className="text-sm font-bold">{variant.name}</span>
                  {variant.priceDelta ? (
                    <span className="text-xs text-muted-foreground">
                      +{variant.priceDelta > 0 ? `$${variant.priceDelta}` : `-$${Math.abs(variant.priceDelta)}`}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Standard</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Purchase Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-auto">
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-2">Quantity</span>
            <QuantityStepper value={quantity} onChange={setQuantity} min={1} max={product.stock} />
          </div>
          <div className="flex-1 w-full pt-6">
            <Button 
              size="lg" 
              className="w-full h-14 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
              onClick={handleAddToCart}
              disabled={product.stock <= 0 || isAdding}
            >
              {isAdding ? (
                <div className="h-6 w-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.stock <= 0 ? "Out of Stock" : "Secure To Collection"}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="flex items-center gap-4 pt-2">
          <button 
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            onClick={handleAddToWishlist}
            disabled={isWishlisting}
          >
            <Heart className={`h-4 w-4 ${isWishlisting ? "animate-pulse" : ""}`} />
            {isWishlisting ? "Updating..." : "Add to Wishlist"}
          </button>
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <Share2 className="h-4 w-4" />
            Share Design
          </button>
        </div>
      </div>

      {/* Trust Badges / Quick Features */}
      <div className="py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-start gap-3">
          <div className="bg-secondary p-2 rounded-lg">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black uppercase tracking-widest">White Glove</span>
            <span className="text-xs text-muted-foreground">Complimentary delivery</span>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-secondary p-2 rounded-lg">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black uppercase tracking-widest">Lifetime</span>
            <span className="text-xs text-muted-foreground">Frame & structure warranty</span>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-secondary p-2 rounded-lg">
            <Ruler className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black uppercase tracking-widest">Precision</span>
            <span className="text-xs text-muted-foreground">Architectural scale</span>
          </div>
        </div>
      </div>
    </div>
  )
}
