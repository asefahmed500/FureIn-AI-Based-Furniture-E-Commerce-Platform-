"use client"

import * as React from "react"
import { CreditCard, Wallet, Landmark, ShieldCheck, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCartStore } from "@/lib/store"
import { createOrder } from "@/lib/actions/order"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface CheckoutPaymentProps {
  onNext: () => void
  total: number
  shippingData: unknown
  items: {
    productId: string
    quantity: number
    price: number
    variant?: string
  }[]
}

export function CheckoutPayment({ onNext, total, shippingData, items }: CheckoutPaymentProps) {
  const router = useRouter()
  const [method, setMethod] = React.useState("card")
  const [isProcessing, setIsProcessing] = React.useState(false)
  const clearLocalCart = useCartStore((state) => state.clearCart)

  const handlePayment = async () => {
    setIsProcessing(true)
    
    try {
      // Simulate external payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      const result = await createOrder({
        shippingAddress: shippingData,
        paymentMethod: method,
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          variant: item.variant
        })),
        total: total
      })

      if (result.success) {
        clearLocalCart()
        onNext()
        router.refresh()
      } else {
        toast.error(result.error || "Order creation failed")
      }
    } catch (error) {
      toast.error("Structural failure in order processing")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-10">
      <RadioGroup value={method} onValueChange={setMethod} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <RadioGroupItem value="card" id="card" className="sr-only" />
          <Label
            htmlFor="card"
            className={`
              flex flex-col items-center justify-center gap-4 rounded-2xl border-2 p-6 cursor-pointer transition-all
              ${method === "card" ? "border-primary bg-primary/5" : "border-border/50 hover:border-border hover:bg-secondary/50"}
            `}
          >
            <CreditCard className={`h-8 w-8 ${method === "card" ? "text-primary" : "text-muted-foreground"}`} />
            <span className="font-black uppercase tracking-widest text-xs">Credit Card</span>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
          <Label
            htmlFor="paypal"
            className={`
              flex flex-col items-center justify-center gap-4 rounded-2xl border-2 p-6 cursor-pointer transition-all
              ${method === "paypal" ? "border-primary bg-primary/5" : "border-border/50 hover:border-border hover:bg-secondary/50"}
            `}
          >
            <Wallet className={`h-8 w-8 ${method === "paypal" ? "text-primary" : "text-muted-foreground"}`} />
            <span className="font-black uppercase tracking-widest text-xs">PayPal</span>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="crypto" id="crypto" className="sr-only" />
          <Label
            htmlFor="crypto"
            className={`
              flex flex-col items-center justify-center gap-4 rounded-2xl border-2 p-6 cursor-pointer transition-all
              ${method === "crypto" ? "border-primary bg-primary/5" : "border-border/50 hover:border-border hover:bg-secondary/50"}
            `}
          >
            <Landmark className={`h-8 w-8 ${method === "crypto" ? "text-primary" : "text-muted-foreground"}`} />
            <span className="font-black uppercase tracking-widest text-xs">Financing</span>
          </Label>
        </div>
      </RadioGroup>

      {method === "card" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label className="font-bold uppercase tracking-widest text-[10px]">Card Number</Label>
              <Input placeholder="0000 0000 0000 0000" className="h-12 rounded-xl border-border/50 bg-background font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="font-bold uppercase tracking-widest text-[10px]">Expiry Date</Label>
              <Input placeholder="MM / YY" className="h-12 rounded-xl border-border/50 bg-background" />
            </div>
            <div className="space-y-2">
              <Label className="font-bold uppercase tracking-widest text-[10px]">CVC / CVV</Label>
              <Input placeholder="•••" className="h-12 rounded-xl border-border/50 bg-background" />
            </div>
          </div>
        </div>
      )}

      {method === "paypal" && (
        <div className="p-12 rounded-2xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
          <div className="h-16 w-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
            <Wallet className="h-8 w-8 text-blue-600" />
          </div>
          <p className="font-bold text-muted-foreground">You will be redirected to PayPal to complete your architectural acquisition safely.</p>
        </div>
      )}

      {method === "crypto" && (
        <div className="p-12 rounded-2xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
          <div className="h-16 w-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
            <Landmark className="h-8 w-8 text-amber-600" />
          </div>
          <p className="font-bold text-muted-foreground">Prequalify for FureIn Finance with low monthly payments over 12, 24, or 36 months.</p>
        </div>
      )}

      <div className="pt-6 border-t border-border/50">
        <Button 
          onClick={handlePayment} 
          disabled={isProcessing}
          size="lg" 
          className="w-full h-14 rounded-xl font-bold text-lg relative overflow-hidden group"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Securing Transaction...
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              Pay ${total.toFixed(2)}
              <CheckCircle2 className="ml-2 h-5 w-5" />
            </div>
          )}
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
        </Button>
        <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground">
          <ShieldCheck className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Architectural-Grade Security Protocol</span>
        </div>
      </div>
    </div>
  )
}
