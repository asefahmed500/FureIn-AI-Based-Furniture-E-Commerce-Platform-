"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { CartItem } from "@/components/cart/cart-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { EmptyCart } from "@/components/cart/empty-cart"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"

import { CartItemWithProduct } from "@/types"
import { type CartItem as LocalCartItem } from "@/lib/store"

interface CartClientContentProps {
  initialDbItems: CartItemWithProduct[]
}

export function CartClientContent({ initialDbItems }: CartClientContentProps) {
  const { data: session } = useSession()
  const { items: localItems, clearCart: clearLocalCart } = useCartStore()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Use DB items if logged in, otherwise local items
  const displayItems = (session ? initialDbItems : localItems) as (CartItemWithProduct | LocalCartItem)[]
  const isEmpty = displayItems.length === 0

  return (
    <>
      {/* Header */}
      <div className="border-b bg-secondary/10">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <Link 
                href="/shop" 
                className="inline-flex items-center text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Gallery
              </Link>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-foreground flex items-center gap-4">
                Architecture <span className="text-muted-foreground/30 font-light">/</span> Cart
              </h1>
            </div>
            
            {!isEmpty && !session && (
              <Button 
                variant="link" 
                onClick={clearLocalCart}
                className="h-auto p-0 text-muted-foreground hover:text-destructive font-bold uppercase tracking-widest text-xs h-fit self-start md:self-end"
              >
                Reset Collection
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-24">
        {isEmpty ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Items List */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="space-y-2 border-t border-border/50">
                {displayItems.map((item, index) => {
                  const itemId = session ? (item as CartItemWithProduct).id : (item as LocalCartItem).id
                  const key = session 
                    ? itemId 
                    : `${itemId}-${(item as LocalCartItem).selectedColor}-${(item as LocalCartItem).selectedVariant}-${index}`
                  
                  return (
                    <CartItem 
                      key={key} 
                      item={item} 
                      isDbItem={!!session}
                    />
                  )
                })}
              </div>
              
              <div className="mt-12 p-8 rounded-2xl bg-secondary/5 border border-dashed border-border/50 flex flex-col items-center text-center">
                <ShoppingBag className="h-8 w-8 text-muted-foreground/30 mb-4" />
                <p className="text-sm font-bold text-muted-foreground italic">
                  &quot;Each piece in your collection is an investment in architectural excellence.&quot;
                </p>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-5 xl:col-span-4">
              <CartSummary items={displayItems as any} isDbCart={!!session} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
