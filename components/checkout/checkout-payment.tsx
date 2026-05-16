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
  onNext: (orderId: string) => void
  total: number
  shippingData: unknown
  items: {
    productId: string
    quantity: number
    price: number
    variant?: string
  }[]
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16)
  return digits.replace(/(.{4})/g, "$1 ").trim()
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4)
  if (digits.length >= 3) return `${digits.slice(0, 2)} / ${digits.slice(2)}`
  return digits
}

function validateCardForm(): { valid: boolean; field?: string; message?: string } {
  const cardNumber = (document.getElementById("card-number") as HTMLInputElement)?.value || ""
  const expiry = (document.getElementById("card-expiry") as HTMLInputElement)?.value || ""
  const cvc = (document.getElementById("card-cvc") as HTMLInputElement)?.value || ""

  const cleanNumber = cardNumber.replace(/\s/g, "")
  if (cleanNumber.length < 13 || cleanNumber.length > 16) {
    return { valid: false, field: "cardNumber", message: "Enter a valid card number (13-16 digits)" }
  }
  if (!/^\d+$/.test(cleanNumber)) {
    return { valid: false, field: "cardNumber", message: "Card number must contain only digits" }
  }
  if (!/^\d{2}\s*\/\s*\d{2}$/.test(expiry.trim())) {
    return { valid: false, field: "expiry", message: "Enter expiry as MM / YY" }
  }
  const [monthStr] = expiry.trim().split("/")
  const month = parseInt(monthStr, 10)
  if (month < 1 || month > 12) {
    return { valid: false, field: "expiry", message: "Invalid expiry month" }
  }
  if (cvc.length < 3 || !/^\d+$/.test(cvc)) {
    return { valid: false, field: "cvc", message: "Enter a valid CVC (3-4 digits)" }
  }
  return { valid: true }
}

export function CheckoutPayment({ onNext, total, shippingData, items }: CheckoutPaymentProps) {
  const router = useRouter()
  const [method, setMethod] = React.useState("card")
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const clearLocalCart = useCartStore((state) => state.clearCart)

  const handlePayment = async () => {
    if (method === "card") {
      const validation = validateCardForm()
      if (!validation.valid) {
        setErrors({ [validation.field || "card"]: validation.message || "Invalid card details" })
        return
      }
    }

    setIsProcessing(true)
    setErrors({})

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      const result = await createOrder({
        shippingAddress: shippingData,
        paymentMethod: method,
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: Number(item.price),
          variant: item.variant
        })),
        total: total
      })

      if (result.success && result.orderId) {
        clearLocalCart()
        onNext(result.orderId)
        router.refresh()
      } else {
        toast.error(result.error || "Order creation failed")
      }
    } catch {
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
              <Input
                id="card-number"
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                className={`h-12 rounded-xl border-border/50 bg-background font-mono ${errors.cardNumber ? "border-red-500" : ""}`}
                onChange={(e) => {
                  e.target.value = formatCardNumber(e.target.value)
                  if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: "" }))
                }}
              />
              {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber}</p>}
            </div>
            <div className="space-y-2">
              <Label className="font-bold uppercase tracking-widest text-[10px]">Expiry Date</Label>
              <Input
                id="card-expiry"
                placeholder="MM / YY"
                maxLength={7}
                className={`h-12 rounded-xl border-border/50 bg-background font-mono ${errors.expiry ? "border-red-500" : ""}`}
                onChange={(e) => {
                  e.target.value = formatExpiry(e.target.value)
                  if (errors.expiry) setErrors((prev) => ({ ...prev, expiry: "" }))
                }}
              />
              {errors.expiry && <p className="text-xs text-red-500">{errors.expiry}</p>}
            </div>
            <div className="space-y-2">
              <Label className="font-bold uppercase tracking-widest text-[10px]">CVC / CVV</Label>
              <Input
                id="card-cvc"
                placeholder="•••"
                maxLength={4}
                className={`h-12 rounded-xl border-border/50 bg-background font-mono ${errors.cvc ? "border-red-500" : ""}`}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4)
                  if (errors.cvc) setErrors((prev) => ({ ...prev, cvc: "" }))
                }}
              />
              {errors.cvc && <p className="text-xs text-red-500">{errors.cvc}</p>}
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
