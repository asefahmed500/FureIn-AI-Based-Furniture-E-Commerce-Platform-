"use client"

import * as React from "react"
import Link from "next/link"
import { ShieldCheck, Truck, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/lib/store"
import { CartItemWithProduct } from "@/types"

interface CartSummaryProps {
  items?: CartItemWithProduct[]
  isDbCart?: boolean
}

export function CartSummary({ items: propItems, isDbCart = false }: CartSummaryProps) {
  const [promoCode, setPromoCode] = React.useState("")
  const localItems = useCartStore((state) => state.items)
  const localSubtotal = useCartStore((state) => state.getTotalPrice())

  const items = propItems || (localItems as unknown as CartItemWithProduct[])
  
  const subtotal = React.useMemo(() => {
    if (isDbCart && items) {
      return items.reduce((acc: number, item: CartItemWithProduct) => acc + (Number(item.product.price) * item.quantity), 0)
    }
    return localSubtotal
  }, [items, isDbCart, localSubtotal])
  
  // Simulated shipping and tax
  const shipping = subtotal > 800 ? 0 : 75
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="rounded-2xl bg-secondary/20 p-6 sm:p-8 border border-border/50 sticky top-24">
      <h2 className="text-xl font-black uppercase tracking-widest mb-6">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="font-bold text-muted-foreground">Subtotal</span>
          <span className="font-black">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="font-bold text-muted-foreground">White Glove Shipping</span>
          <span className={shipping === 0 ? "text-emerald-600 font-black uppercase tracking-wide text-xs" : "font-black"}>
            {shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="font-bold text-muted-foreground">Estimated Tax</span>
          <span className="font-black">${tax.toFixed(2)}</span>
        </div>

        <Separator className="bg-border/50" />
        
        <div className="flex justify-between items-baseline">
          <span className="text-lg font-black uppercase tracking-widest">Total</span>
          <div className="text-right">
            <span className="text-3xl font-black text-primary">${total.toFixed(2)}</span>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter mt-1">
              or $240/mo with FureIn Finance
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex gap-2">
          <Input 
            placeholder="Promo Code" 
            value={promoCode} 
            onChange={(e) => setPromoCode(e.target.value)}
            className="h-11 rounded-xl bg-background border-border/50 font-medium placeholder:text-muted-foreground/50"
          />
          <Button variant="secondary" className="h-11 px-4 rounded-xl font-bold border">
            Apply
          </Button>
        </div>

        <Button asChild size="lg" className="w-full h-14 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px] active:translate-y-[0px]">
          <Link href="/checkout">
            Proceed to Checkout
            <CreditCard className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
          <Truck className="h-5 w-5 text-emerald-600" />
          <p className="text-xs font-bold text-emerald-900 leading-tight">
            {shipping === 0 
              ? "Your order qualifies for complimentary premium shipping."
              : `Add $${(800 - subtotal).toFixed(2)} more for complimentary shipping.`}
          </p>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
          <ShieldCheck className="h-5 w-5 text-amber-600" />
          <p className="text-xs font-bold text-amber-900 leading-tight">
            Payments are secured with high-grade architectural encryption.
          </p>
        </div>
      </div>
    </div>
  )
}
