"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { useCartStore, type CartItem as LocalCartItem } from "@/lib/store"
import { QuantityStepper } from "@/components/ui/quantity-stepper"
import { Button } from "@/components/ui/button"
import { updateCartItem, removeFromCart } from "@/lib/actions/cart"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { type CartItemWithProduct } from "@/types"

interface CartItemProps {
  item: LocalCartItem | CartItemWithProduct
  isDbItem?: boolean
}

export function CartItem({ item, isDbItem = false }: CartItemProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = React.useState(false)
  const updateLocalQuantity = useCartStore((state) => state.updateQuantity)
  const removeLocalItem = useCartStore((state) => state.removeItem)

  const product = isDbItem ? (item as CartItemWithProduct).product : (item as LocalCartItem)
  const selectedColor = isDbItem ? (item as CartItemWithProduct).color : (item as LocalCartItem).selectedColor
  const selectedVariant = isDbItem ? (item as CartItemWithProduct).variant : (item as LocalCartItem).selectedVariant

  const itemPrice = React.useMemo(() => {
    let price = product.price
    if (!isDbItem) {
      const localItem = item as LocalCartItem
      if (selectedVariant && localItem.variants) {
        const variant = localItem.variants.find((v) => v.id === selectedVariant)
        if (variant?.priceDelta) {
          price += variant.priceDelta
        }
      }
    }
    return price
  }, [item, product.price, isDbItem, selectedVariant])

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (isDbItem) {
      setIsUpdating(true)
      const result = await updateCartItem((item as CartItemWithProduct).id, newQuantity)
      if (result.success) {
        router.refresh()
      } else {
        toast.error(result.error || "Update failed")
      }
      setIsUpdating(false)
    } else {
      updateLocalQuantity((item as LocalCartItem).id, newQuantity, selectedColor as any, selectedVariant as any)
    }
  }

  const handleRemove = async () => {
    if (isDbItem) {
      setIsUpdating(true)
      const result = await removeFromCart((item as CartItemWithProduct).id)
      if (result.success) {
        toast.success("Item removed from bag")
        router.refresh()
      } else {
        toast.error(result.error || "Removal failed")
      }
      setIsUpdating(false)
    } else {
      removeLocalItem((item as LocalCartItem).id, selectedColor as any, selectedVariant as any)
    }
  }

  return (
    <div className="group flex flex-col sm:flex-row gap-6 py-8 border-b border-border/50 last:border-0">
      {/* Product Image */}
      <Link 
        href={`/product/${product.slug}`}
        className="relative aspect-square w-full sm:w-40 shrink-0 overflow-hidden rounded-xl bg-secondary/30 border border-border/50"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 160px"
        />
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-black text-lg sm:text-xl leading-tight hover:text-primary transition-colors">
              <Link href={`/product/${product.slug}`}>{product.name}</Link>
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {selectedColor && (
                <span>Finish: <span className="text-foreground">{selectedColor}</span></span>
              )}
              {selectedVariant && (
                <span>Config: <span className="text-foreground">{(product.variants as Array<{id: string, name: string}>)?.find((v) => v.id === selectedVariant)?.name}</span></span>
              )}
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-primary">${itemPrice}</span>
            {product.originalPrice && (
              <p className="text-xs text-muted-foreground line-through font-medium">
                ${product.originalPrice}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <QuantityStepper 
              value={item.quantity} 
              onChange={handleUpdateQuantity} 
              min={1} 
              max={product.stock}
              size="sm"
              disabled={isUpdating}
            />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRemove}
              disabled={isUpdating}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 font-bold text-xs uppercase tracking-widest px-2"
            >
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              Remove
            </Button>
          </div>
          <div className="text-right font-black">
            <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-0.5">Total</span>
            <span className="text-lg">${itemPrice * item.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
