"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag, Eye } from "lucide-react"
import { toast } from "sonner"
import { type Product, type Category } from "@/generated/prisma/client"
import { StarRating } from "@/components/ui/star-rating"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { addToCart } from "@/lib/actions/cart"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ProductDimensions } from "@/lib/store"

interface ProductCardProps {
  product: Product
  variant?: "grid" | "list"
  className?: string
}

export function ProductCard({
  product,
  variant = "grid",
  className,
}: ProductCardProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isWishlisted, setIsWishlisted] = React.useState(false)
  const [isAdding, setIsAdding] = React.useState(false)

  // Calculate discount percentage if original price is present
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  // Format dimensions snippet
  const dims = product.dimensions as unknown as ProductDimensions
  const dimensionString = dims ? `${dims.width}"W × ${dims.depth}"D × ${dims.height}"H` : ""

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    if (!isWishlisted) {
      toast.success(`${product.name} added to wishlist`)
    } else {
      toast.info(`${product.name} removed from wishlist`)
    }
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!session) {
      toast.error("Authentication required", {
        description: "Please authorize entry to manage your architectural bag.",
        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
      })
      return
    }

    setIsAdding(true)
    try {
      const result = await addToCart(product.id, 1)
      if (result.success) {
        toast.success(`${product.name} added to bag`, {
          description: "Structural addition successful.",
          action: {
            label: "View Bag",
            onClick: () => router.push("/cart"),
          },
        })
      } else {
        toast.error(result.error || "Bag integration failed")
      }
    } catch (error) {
      toast.error("Structural protocol failure")
    } finally {
      setIsAdding(false)
    }
  }

  // ── List Variant ──────────────────────────────────────────────────────────
  if (variant === "list") {
    return (
      <div
        className={cn(
          "group relative flex flex-col sm:flex-row overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/20",
          className
        )}
      >
        {/* Image Container */}
        <Link
          href={`/product/${product.slug}`}
          className="relative block h-48 sm:h-auto sm:w-1/3 shrink-0 overflow-hidden bg-secondary/40"
        >
          <Image
            src={product.images[0] || "/products/chair-accent-teal.png"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
            {discountPercent > 0 && (
              <Badge className="bg-amber hover:bg-amber text-white font-bold px-2 py-0.5 text-xs">
                -{discountPercent}%
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-primary hover:bg-primary text-primary-foreground font-semibold px-2 py-0.5 text-xs">
                New
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge variant="destructive" className="font-semibold px-2 py-0.5 text-xs">
                Sold Out
              </Badge>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div className="flex flex-col gap-2">
            {/* Top row: Category/Materials + Wishlist button */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {product.material || "Quality Material"}
              </span>
              <button
                onClick={handleWishlistToggle}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-amber transition-colors"
                aria-label="Toggle Wishlist"
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-transform active:scale-75",
                    isWishlisted && "fill-amber text-amber"
                  )}
                />
              </button>
            </div>

            {/* Title */}
            <Link href={`/product/${product.slug}`} className="group-hover:text-primary transition-colors">
              <h3 className="text-lg font-bold tracking-tight text-foreground line-clamp-2">
                {product.name}
              </h3>
            </Link>

            {/* Dimensions Snippet */}
            {dimensionString && (
              <p className="text-xs text-muted-foreground">
                {dimensionString}
              </p>
            )}

            {/* Description Snippet */}
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {product.description}
            </p>

            {/* Rating */}
            <div className="mt-1">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
            </div>
          </div>

          {/* Bottom row: Price + CTA */}
          <div className="mt-4 flex items-end justify-between gap-4 border-t pt-4">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xl font-extrabold text-foreground">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-medium text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hidden md:inline-flex font-semibold"
              >
                <Link href={`/product/${product.slug}`}>
                  <Eye className="mr-1.5 h-3.5 w-3.5" />
                  Details
                </Link>
              </Button>
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                className="font-bold transition-all shadow-sm hover:shadow"
              >
                {isAdding ? (
                  <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
                    Add to Bag
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Grid Variant (Default) ────────────────────────────────────────────────
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20",
        className
      )}
    >
      {/* Aspect Square Image Container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block w-full aspect-square overflow-hidden bg-secondary/40"
      >
        <Image
          src={product.images[0] || "/products/chair-accent-teal.png"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay subtle gradient on hover for richness */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Badges (Top Left) */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && (
            <Badge className="bg-amber hover:bg-amber text-white font-bold px-2.5 py-0.5 text-xs shadow-sm">
              -{discountPercent}%
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-primary hover:bg-primary text-primary-foreground font-semibold px-2.5 py-0.5 text-xs shadow-sm">
              New
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="destructive" className="font-semibold px-2.5 py-0.5 text-xs shadow-sm">
              Sold Out
            </Badge>
          )}
        </div>

        {/* Wishlist Heart Toggle (Top Right) */}
        <button
          onClick={handleWishlistToggle}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-md text-muted-foreground shadow-sm transition-all hover:bg-background hover:text-amber hover:scale-110"
          aria-label="Toggle Wishlist"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-transform active:scale-75",
              isWishlisted && "fill-amber text-amber"
            )}
          />
        </button>
      </Link>

      {/* Content Area */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex flex-col gap-1.5">
          {/* Category / Material snippet */}
          <div className="flex items-center justify-between gap-1 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            <span className="line-clamp-1">{product.material || "Quality Material"}</span>
            {dimensionString && (
              <span className="hidden text-[10px] sm:inline opacity-80 shrink-0">
                {dimensionString}
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-bold tracking-tight text-foreground line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors text-sm sm:text-base">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="mt-0.5">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
          </div>
        </div>

        {/* Bottom Area: Price + Add to Cart CTA */}
        <div className="mt-3 flex items-center justify-between gap-2 border-t pt-3">
          <div className="flex flex-wrap items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-extrabold text-foreground">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-medium text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAdding}
            className="h-8 rounded-lg px-3 text-xs font-bold transition-all shadow-sm hover:shadow"
          >
            {isAdding ? (
              <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                <ShoppingBag className="mr-1.5 h-3.5 w-3.5 hidden sm:inline" />
                Add
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
