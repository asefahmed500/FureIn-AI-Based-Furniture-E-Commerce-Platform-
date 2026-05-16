"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Check, ChevronRight, Lock, ShieldCheck, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { CheckoutPayment } from "@/components/checkout/checkout-payment"
import { CheckoutSuccess } from "@/components/checkout/checkout-success"
import { CartItemWithProduct } from "@/types"
import { useSession } from "next-auth/react"
import { useCartStore } from "@/lib/store"
import { useRouter } from "next/navigation"

type CheckoutStep = "shipping" | "payment" | "success"

interface CheckoutClientContentProps {
  initialCartItems: CartItemWithProduct[]
}

export function CheckoutClientContent({ initialCartItems }: CheckoutClientContentProps) {
  const { data: session, status } = useSession()
  const { items: localItems, _hasHydrated } = useCartStore()
  const router = useRouter()
  
  const [step, setStep] = React.useState<CheckoutStep>("shipping")
  const [shippingData, setShippingData] = React.useState<unknown>(null)
  const [orderId, setOrderId] = React.useState<string | null>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const items = React.useMemo(() => {
    // Wait for hydration before calculating items if not in session
    if (!_hasHydrated && !session) return []

    if (session) {
      return initialCartItems.map(item => ({
        ...item.product,
        id: item.id,
        productId: item.product.id,
        quantity: item.quantity,
        variant: item.variant
      }))
    }
    return localItems.map(item => ({
      ...item,
      productId: item.id,
      variant: item.selectedVariant,
      name: item.name,
    }))
  }, [session, initialCartItems, localItems, _hasHydrated])

  React.useEffect(() => {
    // Only redirect if:
    // 1. Component is mounted
    // 2. Zustand has hydrated
    // 3. Auth session is not loading
    // 4. Cart is truly empty
    // 5. Not on the success step
    if (mounted && _hasHydrated && status !== "loading" && items.length === 0 && step !== "success") {
      router.push("/shop")
    }
  }, [mounted, _hasHydrated, status, items.length, step, router])

  if (!mounted || status === "loading" || (!_hasHydrated && !session)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground animate-pulse">
            Securely initializing your checkout session...
          </p>
        </div>
      </div>
    )
  }

  const subtotal = items.reduce((acc, item) => {
    const price = Number(item.price ?? 0)
    const delta = typeof (item as Record<string, unknown>).variantPriceDelta === "number"
      ? (item as Record<string, unknown>).variantPriceDelta as number
      : 0
    return acc + ((price + delta) * item.quantity)
  }, 0)
  const shipping = subtotal > 800 ? 0 : 75
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const steps = [
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
    { id: "success", label: "Complete" },
  ]

  const handleShippingNext = (data: unknown) => {
    setShippingData(data)
    setStep("payment")
  }

  return (
    <>
      {/* Checkout Header */}
      <div className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            FURE<span className="text-primary">IN</span>
          </Link>
          
          <div className="hidden sm:flex items-center gap-8">
            {steps.map((s, idx) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className={`
                  flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all
                  ${step === s.id ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20" : 
                    steps.findIndex(x => x.id === step) > idx ? "bg-emerald-500 text-white" : "bg-secondary text-muted-foreground"}
                `}>
                  {steps.findIndex(x => x.id === step) > idx ? <Check className="h-4 w-4" /> : idx + 1}
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest ${step === s.id ? "text-foreground" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
                {idx < steps.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground/30" />}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content Area */}
          <div className="lg:col-span-7 xl:col-span-8">
            {step === "shipping" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">Shipping Details</h2>
                  <p className="text-muted-foreground font-medium">Please enter your delivery information.</p>
                </div>
                <CheckoutForm onNext={handleShippingNext} />
              </div>
            )}

            {step === "payment" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <Button variant="ghost" size="sm" onClick={() => setStep("shipping")} className="h-8 w-8 p-0 rounded-full">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">Payment Method</h2>
                    <p className="text-muted-foreground font-medium">Choose how you would like to pay.</p>
                  </div>
                </div>
                <CheckoutPayment 
                  onNext={(id) => {
                    setOrderId(id)
                    setStep("success")
                  }} 
                  total={total} 
                  shippingData={shippingData} 
                  items={items.map((item: any) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                    variant: item.variant || undefined,
                  }))}
                />
              </div>
            )}

            {step === "success" && (
              <CheckoutSuccess orderId={orderId || ""} />
            )}
          </div>

          {/* Sidebar Summary (Only if not success) */}
          {step !== "success" && (
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="rounded-2xl bg-background border border-border/50 p-6 sm:p-8 sticky top-28 overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <h3 className="text-lg font-bold uppercase tracking-widest mb-6">Order Summary</h3>
                
                <div className="space-y-6">
                  <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary/50 border">
                          <Image src={item.images[0]} alt={item.name} fill className="object-cover" sizes="64px" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-bold line-clamp-1">{item.name}</p>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                            {item.quantity} × ${Number(item.price)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">${item.quantity * Number(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-bold">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-bold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-4 border-t border-border/50">
                      <span className="text-lg font-bold uppercase tracking-widest">Total</span>
                      <span className="text-3xl font-bold text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-[10px] font-bold text-primary-foreground/60 leading-normal uppercase tracking-widest">
                      Your purchase is protected by our structural guarantee.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
